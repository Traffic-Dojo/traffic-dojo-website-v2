import { Swiper } from "swiper/vue";
import { Mousewheel } from "swiper/modules";

const modules = [Mousewheel];

type SwiperProps = InstanceType<typeof Swiper>["$props"];

export function createSwiperConfig(props: SwiperProps = {}) {
  return {
    direction: "vertical",
    class: "h-screen",
    modules: modules,
    mousewheel: {
      thresholdDelta: 12,
      enabled: true,
    },
    speed: 800,
    ...props,
  } as SwiperProps;
}
