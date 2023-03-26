import { Heading } from "@chakra-ui/react";
import { Blue, Red } from "lib/components/typography/MarkdownColorOverrides";
import Markdown from "markdown-to-jsx";
import React from "react";
import { useFormContext } from "react-hook-form";

interface UpgradeViewerProps {
  upgradeNameId: string;
  descriptionId: string;
}

const UpgradeViewer = ({
  upgradeNameId,
  descriptionId,
}: UpgradeViewerProps) => {
  const { getValues } = useFormContext();

  const upgradeName = getValues(upgradeNameId);
  const description = getValues(descriptionId);

  return (
    <div className="msc-UpgradeField">
      <Heading size="sm">{upgradeName}</Heading>
      <Markdown
        options={{
          wrapper: "section",
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
        {description}
      </Markdown>
    </div>
  );
};

export default UpgradeViewer;
