import React from "react";

import Markdown from "markdown-to-jsx";

import {
  Blue,
  Red,
} from "~/components/typography/MarkdownColorOverrides/MarkdownColorOverrides";

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
