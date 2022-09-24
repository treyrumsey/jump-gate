import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { AttributeField } from "lib/components/forms/AttributeField/AttributeField";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import React from "react";
import { useFormContext } from "react-hook-form";

export const Attributes = () => {
  return (
    <section className="msc-Attributes">
      <AttributeField name="physique" />
      <AttributeField name="reflex" />
      <AttributeField name="discipline" />
      <AttributeField name="wits" />
    </section>
  );
};
