<script setup lang="ts">
import { motion, stagger, type VariantType } from "motion-v";
import AppSection from "../../components/AppSection.vue";
import SwiperFixedSlider from "../swiper/SwiperFixedSlider.vue";

import programmerEmoji from "./../../assets/images/emojis/programmer.png";
import phoneEmoji from "./../../assets/images/emojis/phone.png";
import sparkEmoji from "./../../assets/images/emojis/spark.png";
import crystalEmoji from "./../../assets/images/emojis/ball.png";

interface ContentItem {
  emote: string;
  emoteLabel: string;
  label: string;
  description: string;
}

const content: ContentItem[] = [
  {
    emote: "",
    emoteLabel: "",
    label: "",
    description:
      "At Traffic Dojo We believe that success in the digital realm requires a strategic approach tailored to the unique needs of each business. Whether you're looking for a complete overhaul of your online presence or need assistance with a specific aspect of your marketing strategy, we've got you covered. Let's explore how we can help you achieve your goals in the digital landscape.",
  },
  {
    emote: programmerEmoji,
    emoteLabel: "Programmer emoji",
    label: "Web-design & Development",
    description:
      "Crafting an effective website is more than just a technical task; it's about creating a digital ambassador for your brand. At Traffic Dojo, we understand that your website is often the first interaction potential customers have with your business. That's why our approach to web design and development goes beyond aesthetics and functionality. We meticulously craft each site to not only impress visitors but also drive engagement, generate leads, and ultimately boost your bottom line. With our team by your side, your website isn't just another URL—it's a powerful tool for business growth.",
  },
  {
    emote: phoneEmoji,
    emoteLabel: "Phone emoji",
    label: "Paid media",
    description:
      "In today's competitive digital landscape, every dollar spent on paid media matters. That's why our team is dedicated to multiplying your ROI across platforms like Google Ads, Microsoft Ads, and social media channels. We specialize in crafting strategic PPC campaigns that drive tangible results, whether it's generating leads or maximizing conversions. Recognizing that not every business is suited for every platform, we tailor our approach to create the best-performing strategy for your unique needs. Let us optimize your ad spend and supercharge your brand's performance across various online platforms",
  },
  {
    emote: sparkEmoji,
    emoteLabel: "Spark emoji",
    label: "Content Marketing",
    description:
      "Content is king in the digital age, and our content marketing services are designed to help you reign supreme. From engaging blog posts and informative articles to captivating videos and eye-catching infographics, we create compelling content that resonates with your audience. Our team of skilled writers, designers, and strategists collaborate to develop content that not only attracts attention but also drives action. Whether you're looking to boost brand awareness, enhance your online presence, or establish thought leadership in your industry, our content marketing solutions can help you achieve your goals",
  },
  {
    emote: crystalEmoji,
    emoteLabel: "Crystal ball emoji",
    label: "Visual Branding",
    description:
      "Our visual branding services are all about making your brand stand out in a crowded digital landscape. From logo design and color palettes to typography and imagery, we craft cohesive visual identities that leave a lasting impression. Whether you're launching a new brand or looking to refresh your existing one, our team of designers and branding experts will work closely with you to create visuals that capture the essence of your brand and resonate with your target audience. Let us help you make a memorable first impression and establish a strong visual identity that sets you apart from the competition.",
  },
];

const gradientVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, transition: { duration: 2 } },
};

const headingVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, y: -40, transition: { duration: 1.5 } },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, delay: 0.3 } },
};

const fieldsVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, y: -40, transition: { duration: 1 } },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delayChildren: stagger(0.3) },
  },
};

const descriptionVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, y: -40, transition: { duration: 1 } },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
};
</script>

<template>
  <SwiperFixedSlider :slides="content.length">
    <template #default="{ activeSlideIndex, slideToIndex }">
      <AppSection
        class-name="px-6 relative flex items-center justify-center md:px-20"
        id="whatcanwedo"
      >
        <template #gradients>
          <motion.div
            class="gradient-blue"
            :variants="gradientVariants"
            initial="hidden"
            while-in-view="visible"
          ></motion.div>
        </template>

        <div class="mx-auto">
          <motion.h2
            class="mb-6 text-4xl font-medium sm:text-6xl md:mb-14"
            :variants="headingVariants"
            initial="hidden"
            while-in-view="visible"
          >
            What we can do
          </motion.h2>

          <div
            class="flex flex-col gap-8 lg:grid lg:grid-cols-[2fr_3fr] lg:grid-rows-[min-content_fit-content] lg:content-center lg:gap-x-4 lg:gap-y-28"
          >
            <motion.div
              class="flex max-w-[700px] flex-wrap gap-4 py-2 lg:grid lg:gap-8"
              :variants="fieldsVariants"
              initial="hidden"
              while-in-view="visible"
            >
              <motion.div
                v-for="(item, i) in content"
                :key="item.label"
                v-show="item.emote"
                class="grid grid-cols-[auto_auto_1fr] items-center gap-3 after:h-[1px] after:origin-left after:scale-x-0 after:bg-white after:transition-all after:duration-1000 md:gap-4"
                :class="{ 'after:scale-x-100': activeSlideIndex === i }"
                :variants="fieldsVariants"
              >
                <img
                  class="aspect-square h-[15px] object-center sm:h-[22px] lg:h-[28px]"
                  :src="item.emote"
                  :alt="item.emoteLabel"
                />

                <button
                  @click="slideToIndex(i)"
                  class="field pointer-events-auto relative cursor-pointer rounded-full px-3 py-2 text-sm transition-all duration-500 ease-in-out md:px-5 md:py-[14px] lg:px-7 lg:text-lg"
                  :class="{
                    'bg-white text-black shadow-[0px_0px_30px_5px_rgba(255,255,255,0.3)]':
                      activeSlideIndex === i,
                    'shadow-none':
                      activeSlideIndex > 0 && activeSlideIndex !== i,
                  }"
                >
                  {{ item.label }}
                </button>
              </motion.div>
            </motion.div>

            <div>
              <motion.p
                :key="activeSlideIndex"
                class="max-w-[470px] text-sm leading-relaxed font-normal tracking-wide sm:text-base md:max-w-[700px] md:text-lg lg:text-[22px] lg:leading-normal"
                :variants="descriptionVariants"
                initial="hidden"
                while-in-view="visible"
              >
                {{ content[activeSlideIndex]?.description }}
              </motion.p>
            </div>
          </div>
        </div>
      </AppSection>
    </template>
  </SwiperFixedSlider>
</template>

<style scoped>
.gradient-blue {
  --multiplier: 2;
  --minsize: 400px;

  --minmax: clamp(var(--minsize), 100%, max(100vh, 100vw));
  --size: calc(var(--minmax) * var(--multiplier));

  width: var(--size);
  height: var(--size);

  position: absolute;

  background: radial-gradient(
    50% 50% at 50% 50%,
    var(--color-gradient-blue),
    transparent
  );

  animation: gradient-move 7s ease-in-out infinite alternate;
}

@keyframes gradient-move {
  0% {
    transform: translateX(-47%) translateY(-50%);
  }

  50% {
    transform: translateX(-30%) translateY(-60%);
  }

  100% {
    transform: translateX(-30%) translateY(-50%);
  }
}

.field {
  box-shadow:
    -19.3px 19.3px 19.3px 0px rgba(255, 255, 255, 0.1) inset,
    19.3px -19.3px 19.3px 0px rgba(164, 163, 163, 0.1) inset;
}

.field:hover {
  box-shadow:
    -14.43px 14.43px 14.43px 0px rgba(255, 255, 255, 0.1) inset,
    14.43px -14.43px 14.43px 0px rgba(164, 163, 163, 0.1) inset,
    0px 0px 28.05px 0px rgba(65, 114, 239, 1);
}

.field::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  background: linear-gradient(
      122.83deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    )
    border-box;
  background-size: 400% 400%;
  mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  border-radius: 9999px;

  animation: gradientAnimation ease-in-out 5s infinite backwards;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 80% 50%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
