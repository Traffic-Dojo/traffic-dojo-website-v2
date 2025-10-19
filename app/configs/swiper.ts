import { Swiper } from "swiper/vue";
import { Mousewheel } from "swiper/modules";

const modules = [Mousewheel];

type SwiperProps = InstanceType<typeof Swiper>["$props"];

export const initialSwiperConfig = {
  direction: "vertical",
  class: "h-screen",
  modules: modules,
  mousewheel: {
    thresholdDelta: 12,
    enabled: true,
  },
  speed: 800,
} as SwiperProps;
