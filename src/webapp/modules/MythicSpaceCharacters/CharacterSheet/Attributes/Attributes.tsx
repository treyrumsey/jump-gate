import { AttributeField } from "lib/components/forms/AttributeField/AttributeField";
import React from "react";

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
