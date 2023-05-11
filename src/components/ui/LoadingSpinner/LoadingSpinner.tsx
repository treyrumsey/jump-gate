import React from "react";

import { Box } from "@chakra-ui/react";

type LoadingSpinnerProps = {
  size?: string;
};

export const LoadingSpinner = ({ size }: LoadingSpinnerProps) => {
  return (
    <Box
      className="jg-LoadingSpinner"
      position="relative"
      height={size ?? "200px"}
      width={size ?? "200px"}
    >
      <svg className="circleFW" viewBox="0 0 1000 1000">
        <circle
          className="path"
          cx="500"
          cy="500"
          fill="none"
          r="355"
          stroke="#3676c8"
        />
      </svg>
      <svg
        className="circleSW"
        style={{ animationDuration: "1.4s" }}
        viewBox="0 0 1000 1000"
      >
        <circle
          className="path2"
          cx="500"
          cy="500"
          fill="none"
          r="355"
          stroke="var(--jg-light-blue)"
        />
      </svg>
      <svg className="circleFW" viewBox="0 0 1000 1000">
        <circle
          className="path3"
          cx="500"
          cy="500"
          fill="none"
          r="355"
          stroke="var(--jg-light-blue)"
        />
      </svg>
      <svg className="circleFW" viewBox="0 0 1000 1000">
        <circle
          className="path4"
          cx="500"
          cy="500"
          fill="none"
          r="255"
          stroke="#FFF"
        />
      </svg>
      <svg className="circleFW" viewBox="0 0 1000 1000">
        <circle
          className="path5"
          cx="500"
          cy="500"
          fill="none"
          r="420"
          stroke="var(--jg-light-blue)"
        />
      </svg>
      <svg className="circleFW" viewBox="0 0 1000 1000">
        <circle
          className="path6"
          cx="500"
          cy="500"
          fill="none"
          r="420"
          stroke="var(--jg-light-blue)"
        />
      </svg>
      <svg className="circleSW" viewBox="0 0 1000 1000">
        <circle
          className="path7"
          cx="500"
          cy="500"
          fill="none"
          r="420"
          stroke="var(--jg-light-blue)"
        />
      </svg>
      <svg
        className="circleSW"
        style={{ animationTimingFunction: "ease-in-out" }}
        viewBox="0 0 1000 1000"
      >
        <circle
          className="path8"
          cx="500"
          cy="500"
          fill="none"
          r="420"
          stroke="var(--jg-light-blue)"
        />
        <svg className="circleFW" viewBox="0 0 1000 1000"></svg>
        <circle
          className="path9"
          cx="500"
          cy="500"
          fill="none"
          r="225"
          stroke="var(--jg-light-blue)"
        />
      </svg>
    </Box>
  );
};
