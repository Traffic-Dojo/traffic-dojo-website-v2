import type { SwiperOptions } from "swiper/types";
import { Mousewheel } from "swiper/modules";

const modules = [Mousewheel];

export const initialSwiperConfig: SwiperOptions = {
  direction: "vertical",
  modules: modules,
  mousewheel: {
    thresholdDelta: 12,
    enabled: true,
  },
  speed: 800,
};
