import React from "react";

import { AttributeField } from "~/components/forms/AttributeField/AttributeField";
import { AttributeName } from "~/models/Attribute.model";

export const Attributes = () => {
  return (
    <section className="jg-Attributes">
      <AttributeField name={AttributeName.Physique} />
      <AttributeField name={AttributeName.Reflex} />
      <AttributeField name={AttributeName.Discipline} />
      <AttributeField name={AttributeName.Wits} />
    </section>
  );
};
