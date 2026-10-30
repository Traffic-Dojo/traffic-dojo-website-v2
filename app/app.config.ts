import { defineAppConfig } from "#imports";

// import { socials } from "./configs/socials";
import { sections } from "./configs/sections";
import { initialSwiperConfig } from "./configs/swiper";

export default defineAppConfig({
  initialSwiperConfig,
  sections,
  consult_link:
    "mailto:maksim@traffic-dojo.com?subject=Traffic%20Dojo%20project%20inquiry",
  socials: {
    linkedin: "https://www.linkedin.com/company/103803714",
  },
  contacts: [
    {
      name: "info@traffic-dojo.com",
      href: "mailto:info@traffic-dojo.com",
      event: "Contacts_Email",
    },
    {
      name: "+1 (347) 928-9618",
      href: "tel:+13479289618",
      event: "Contacts_Telephone",
    },
  ],
});
