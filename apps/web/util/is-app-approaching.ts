export const isAppApproaching = ({
  isIOSApproaching = false,
  isAndroidpproaching = false,
}: {
  isIOSApproaching?: boolean;
  isAndroidpproaching?: boolean;
} = {}) => {
  if (typeof window === 'undefined') return;

  const userAgent = navigator.userAgent;

  if (isIOSApproaching) {
    return userAgent.includes('APP_WISHROOM_IOS');
  } else if (isAndroidpproaching) {
    return userAgent.includes('APP_WISHROOM_ANDROID');
  } else {
    return userAgent.includes('APP_WISHROOM_IOS') || userAgent.includes('APP_WISHROOM_ANDROID');
  }
};
