import {
  Blue,
  Red,
} from "lib/components/typography/MarkdownColorOverrides/MarkdownColorOverrides";
import Markdown from "markdown-to-jsx";
import React from "react";

interface MarkdownViewProps {
  children: string;
}

const MarkdownView = ({ children }: MarkdownViewProps) => {
  return (
    <Markdown
      className="jg-MarkdownView"
      options={{
        wrapper: "div",
        forceWrapper: true,
        overrides: {
          Red: {
            component: Red,
          },
          Blue: {
            component: Blue,
          },
        },
      }}
    >
      {children}
    </Markdown>
  );
};

export default MarkdownView;
