<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Form } from "vee-validate";
import { ref, computed, provide } from "vue";
import type { ZodSchema } from "zod";

const props = defineProps({
  validationSchema: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["submit"]);
const currentStepIdx = ref(0);

// Injects the starting step, child <form-steps> will use this to generate their ids
const stepCounter = ref(0);
provide("STEP_COUNTER", stepCounter);

// Inject the live ref of the current index to child components
// will be used to toggle each form-step visibility
provide("CURRENT_STEP_INDEX", currentStepIdx);

// if this is the last step
const isLastStep = computed(() => {
  return currentStepIdx.value === stepCounter.value - 1;
});

// const hasPrevious = computed(() => {
//   return currentStepIdx.value > 0;
// });

const currentSchema = computed(() => {
  return toTypedSchema(
    props.validationSchema[currentStepIdx.value] as ZodSchema,
  );
});

const onSubmit = (values: unknown) => {
  console.log("onSubmit called with values:", values);

  if (!isLastStep.value) {
    currentStepIdx.value++;
    return;
  }

  emit("submit", values);
};

const onInvalidSubmit = ({
  values,
  errors,
  results,
}: {
  values: unknown;
  errors: unknown;
  results: unknown;
}) => {
  console.log("Invalid submit attempt");
  console.log("Values:", values);
  console.log("Errors:", errors);
  console.log("Results:", results);
};

// function goToPrev() {
//   if (currentStepIdx.value === 0) {
//     return;
//   }

//   currentStepIdx.value--;
// }
</script>

<template>
  <Form
    :validation-schema="currentSchema"
    :keep-values="true"
    :validate-on-mount="false"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
  >
    <slot />
  </Form>
</template>
