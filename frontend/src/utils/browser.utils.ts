export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "Unknown";

  // Détection du navigateur
  if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
    const match = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
    const match = userAgent.match(/Version\/(\d+\.\d+\.\d+)/);
    if (match) browserVersion = match[1];
  } else if (userAgent.indexOf("Edge") > -1) {
    browserName = "Edge";
    const match = userAgent.match(/Edge\/(\d+\.\d+\.\d+\.\d+)/);
    if (match) browserVersion = match[1];
  }

  return {
    browserName,
    browserVersion,
  };
};
