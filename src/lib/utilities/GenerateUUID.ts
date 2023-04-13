/** Used for testing in non-secure contexts, specifically when debugging and testing on local network, which cannot use a secure context */
const uuidv4 = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    // tslint:disable-next-line:no-bitwise
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  ) as string;
};

export const generateUUID = () => {
  return window.isSecureContext ? crypto.randomUUID() : uuidv4();
};
