import { AttributeField } from "lib/components/forms/AttributeField/AttributeField";
import { AttributeName } from "models/Attribute.model";
import React from "react";

export const Attributes = () => {
  return (
    <section className="msc-Attributes">
      <AttributeField name={AttributeName.Physique} />
      <AttributeField name={AttributeName.Reflex} />
      <AttributeField name={AttributeName.Discipline} />
      <AttributeField name={AttributeName.Wits} />
    </section>
  );
};
