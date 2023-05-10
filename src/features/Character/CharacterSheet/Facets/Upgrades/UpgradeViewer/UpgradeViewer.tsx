import React from "react";
import { useFormContext } from "react-hook-form";

import { Heading } from "@chakra-ui/react";

import MarkdownView from "~/components/typography/MarkdownView/MarkdownView";

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
    <div className="jg-UpgradeField">
      <Heading size="sm">{upgradeName}</Heading>
      <MarkdownView>{description}</MarkdownView>
    </div>
  );
};

export default UpgradeViewer;
