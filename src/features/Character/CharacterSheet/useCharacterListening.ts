import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { get, ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "~/App";
import { Character } from "~/models/Character.model";

const useCharacterListening = () => {
  const [user] = useAuthState(auth);
  const { id: characterId } = useParams();
  const { setValue } = useFormContext();

  const navigate = useNavigate();

  const saveChanges = (debouncedFormWatch: { [x: string]: any }) => {
    debouncedFormWatch.lastModified = Date.now();
    if (user) {
      set(
        ref(db, `users/${user.uid}/characters/${debouncedFormWatch.id}`),
        debouncedFormWatch
      ).catch((error) => console.error(error));
    } else {
      localStorage.setItem(
        debouncedFormWatch.id,
        JSON.stringify(debouncedFormWatch)
      );
    }
  };

  const onWindowFocus = async (debouncedFormWatch: { [x: string]: any }) => {
    if (user) {
      const characterSnapshot = await get(
        ref(db, `users/${user?.uid}/characters/${characterId}`)
      );
      if (!characterSnapshot.exists()) {
        navigate("/characters");
      } else {
        const characterSnapshotValue = characterSnapshot.val() as Character;
        if (
          characterSnapshotValue.lastModified ??
          0 > debouncedFormWatch.lastModified
        ) {
          Object.keys(characterSnapshotValue).forEach((key) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setValue(key as any, (characterSnapshotValue as any)[key]);
          });
        }
      }
    } else {
      const localCharacter = JSON.parse(
        localStorage.getItem(characterId ?? "") ?? ""
      );
      if (localCharacter.lastModified ?? 0 > debouncedFormWatch.lastModified) {
        Object.keys(localCharacter).forEach((key) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setValue(key as any, (localCharacter as any)[key]);
        });
      }
    }
  };

  return { saveChanges, onWindowFocus };
};

export default useCharacterListening;
