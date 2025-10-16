export const events = {
  proposal: "proposal",
  schedule_call: "schedule_call",
  socials_whatsapp: "socials_whatsapp",
  socials_linkedin: "socials_linkedin",
  form_submit: "form_submit",
  email_subscription: "email_subscription",
  quiz_step: (step: string) => `quiz_${step}`,
  blog_preview: "blog_preview",
  blog_page: (blog: string) => `blog_${blog}`,
};

export function sendAnalyticsEvent(eventName: string) {
  if ("gtag" in window) {
    // @ts-expect-error no types provided for 'gtag' in 'window'
    window.gtag("event", eventName);
  }
}
