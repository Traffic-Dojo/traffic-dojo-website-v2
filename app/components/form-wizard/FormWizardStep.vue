<script setup lang="ts">
import { useFormContext } from "vee-validate";
import { computed, inject, type Ref } from "vue";
import { motion, stagger, type VariantType } from "motion-v";

const currentIdx = inject<Ref<number, number>>("STEP_COUNTER")!.value++;
const formStepIdx = inject<Ref<number, number>>("CURRENT_STEP_INDEX")!;

const shouldShow = computed(() => {
  return currentIdx === formStepIdx.value;
});

const { meta, errorBag, isFieldTouched } = useFormContext();

const disabled = computed(() => !meta.value.valid || !meta.value.dirty);

const variants: Record<string, VariantType> = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delayChildren: stagger(0.3) },
  },
};

const props = defineProps<{
  analytics?: { eventName: string; eventPayload?: JSON };
}>();

const { sendAnalyticsEvent } = useAnalytics();

watchEffect(() => {
  if (shouldShow.value && props.analytics) {
    sendAnalyticsEvent(props.analytics.eventName, props.analytics.eventPayload);
  }
});

/**
 * in schemas.ts file we have custom telephone input validation and no matter if we have
 * validationOnMount = false on whole <Form> element on in useField composable,
 * it still validates the telephone input's '' (empty string) on mount and renders an error
 *
 * temporary solutions:
 * - create our own computer variable that checks if fields were touched
 * or
 * - validate form on submit (but that's what we don't want)
 */
const errors = computed(() =>
  Object.entries(errorBag.value).reduce((acc, [fieldName, fieldErrors]) => {
    console.log(fieldName, fieldErrors);

    if (isFieldTouched(fieldName) && fieldErrors) {
      acc.push(...fieldErrors);
    }

    return acc;
  }, [] as string[]),
);
</script>

<template>
  <motion.div
    v-if="shouldShow"
    initial="hidden"
    animate="visible"
    :variants="variants"
    class="flex flex-col gap-8"
  >
    <motion.div
      :variants="variants"
      class="text-black-modal text-2xl font-semibold sm:text-3xl md:text-4xl"
    >
      <slot name="title" />
    </motion.div>

    <motion.div :variants="variants">
      <slot />
    </motion.div>

    <div v-if="errors.length" class="text-danger">
      <ul>
        <li v-for="error in errors" :key="error">
          {{ error }}
        </li>
      </ul>
    </div>

    <motion.div
      :variants="variants"
      class="flex items-center justify-end gap-4"
    >
      <button
        type="submit"
        :disabled
        :class="[
          'flex w-fit items-center gap-4 rounded-full px-6 py-2 sm:order-1',
          {
            'bg-gray-secondary cursor-not-allowed text-white opacity-100':
              disabled,
            'bg-accent cursor-pointer text-black': !disabled,
          },
        ]"
      >
        <span>{{ disabled ? "Choose one or more" : "Next question" }}</span>

        <svg
          v-if="!disabled"
          width="20"
          height="13"
          viewBox="0 0 20 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.9658 6.96608C19.2782 6.65366 19.2782 6.14712 18.9658 5.83471L13.8746 0.743536C13.5622 0.431117 13.0557 0.431117 12.7433 0.743536C12.4308 1.05596 12.4308 1.56249 12.7433 1.87491L17.2688 6.40039L12.7433 10.9259C12.4308 11.2383 12.4308 11.7448 12.7433 12.0572C13.0557 12.3697 13.5622 12.3697 13.8746 12.0572L18.9658 6.96608ZM0.00012207 7.20039H18.4001V5.60039H0.00012207V7.20039Z"
            fill="black"
          />
        </svg>
      </button>
    </motion.div>
  </motion.div>
</template>
