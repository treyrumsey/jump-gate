import React from "react";

interface BlueProps {
  children: React.ReactNode;
}

export const Blue = ({ children }: BlueProps) => {
  return <span className="jg-md-Blue">{children}</span>;
};

interface RedProps {
  children: React.ReactNode;
}

export const Red = ({ children }: RedProps) => {
  return <span className="jg-md-Red">{children}</span>;
};
