import React from "react";

interface BlueProps {
  children: React.ReactNode;
}

export const Blue = ({ children }: BlueProps) => {
  return <span className="msc-md-Blue">{children}</span>;
};

interface RedProps {
  children: React.ReactNode;
}

export const Red = ({ children }: RedProps) => {
  return <span className="msc-md-Red">{children}</span>;
};
