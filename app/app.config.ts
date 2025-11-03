import { defineAppConfig } from "#imports";

// import { socials } from "./configs/socials";
import { sections } from "./configs/sections";
import { initialSwiperConfig } from "./configs/swiper";

export default defineAppConfig({
  initialSwiperConfig,
  sections,
  consult_link:
    "https://calendly.com/d/ckmp-37t-5g8/traffic-dojo-free-consultation",
  socials: {
    whatsapp: "https://wa.me/message/3FKKFYNDVLZ7N1",
    linkedin: "https://www.linkedin.com/company/103803714",
  },
  contacts: [
    {
      name: "info@traffic-dojo.com",
      href: "mailto:info@traffic-dojo.com",
      event: "Contacts_Email",
    },
    {
      name: "+1 (646) 917-8329",
      href: "tel:+1 (646) 917-8329",
      event: "Contacts_Telephone",
    },
  ],
});
