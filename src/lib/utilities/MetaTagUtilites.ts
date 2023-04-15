export const isMobileAppleDevice = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAppleDevice = navigator.userAgent.includes("Macintosh");
  const isTouchScreen = navigator.maxTouchPoints >= 1;

  return isIOS || (isAppleDevice && isTouchScreen);
};

export const initializeMetaTags = () => {
  if (isMobileAppleDevice()) {
    document
      .getElementById("viewport-meta")
      ?.setAttribute(
        "content",
        "width=device-width,initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
  }
};
