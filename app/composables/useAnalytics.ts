export const useAnalytics = () => {
  const { gtag } = useGtag();

  function sendAnalyticsEvent(eventName: string, eventPayload?: JSON) {
    if (process.env.NODE_ENV !== "production") {
      console.log("DEV ANALYTICS", eventName, eventPayload);
    }

    gtag("event", eventName, eventPayload);
  }

  return {
    sendAnalyticsEvent,
  };
};
