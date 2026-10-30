export const useAnalytics = () => {
  const { gtag } = useGtag();

  function sendAnalyticsEvent(eventName: string, eventPayload?: JSON) {
    if (process.env.NODE_ENV !== "production") {
      console.log("sendAnalyticsEvent:", eventName, eventPayload);
    }

    gtag("event", eventName, eventPayload);

    if (typeof window !== "undefined" && "fbq" in window && typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, eventPayload);
    }
  }

  return {
    sendAnalyticsEvent,
  };
};
