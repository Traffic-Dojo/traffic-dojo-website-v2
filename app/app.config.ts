import { defineAppConfig } from "#imports";
import { Swiper } from "swiper/vue";
import { Mousewheel } from "swiper/modules";

const modules = [Mousewheel];

type SwiperProps = InstanceType<typeof Swiper>["$props"];

const initialSwiperConfig = {
  direction: "vertical",
  class: "h-screen",
  modules: modules,
  mousewheel: {
    thresholdDelta: 12,
    enabled: true,
  },
  speed: 800,
} as SwiperProps;

const sections = {
  introduction: { label: "Dojo", id: "dojo", href: "/#dojo" },
  we: { label: "We", id: "we", href: "/#we" },
  purpose: { label: "Our purpose", id: "our-purpose", href: "/#our-purpose" },
  businesses: {
    label: "For businesses",
    id: "for-businesses",
    href: "/#for-businesses",
  },
  whatcanwedo: {
    label: "What we can do",
    id: "what-we-can-do",
    href: "/#what-we-can-do",
  },
  contactus: { label: "Contact Us", id: "contact-us", href: "/#contact-us" },
  blog: { label: "Blog", id: "blog", href: "/blog" },
};

export default defineAppConfig({
  initialSwiperConfig,
  sections,
});
