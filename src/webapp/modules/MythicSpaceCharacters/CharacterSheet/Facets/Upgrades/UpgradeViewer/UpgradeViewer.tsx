import { Heading } from "@chakra-ui/react";
import {
  Blue,
  Red,
} from "lib/components/typography/MarkdownColorOverrides/MarkdownColorOverrides";
import MarkdownView from "lib/components/typography/MarkdownView/MarkdownView";
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
      <MarkdownView>{description}</MarkdownView>
    </div>
  );
};

export default UpgradeViewer;
