<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Form } from "vee-validate";
import { ref, computed, provide } from "vue";
import z, { type ZodSchema } from "zod";

const props = defineProps({
  validationSchema: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["submit"]);

const currentStepIdx = ref(0);
const stepCounter = ref(0);

provide("STEP_COUNTER", stepCounter);
provide("CURRENT_STEP_INDEX", currentStepIdx);

const isLastStep = computed(() => {
  return currentStepIdx.value === stepCounter.value - 1;
});

const currentSchema = computed(() => {
  const schemas = props.validationSchema.slice(
    0,
    currentStepIdx.value + 1,
  ) as ZodSchema[];

  // warn: we need to create a merged schema, because onSubmit function gets values only
  // from the current schema, not from all of them
  const mergedSchema = schemas.reduce((acc, schema) => {
    return acc.merge(schema);
  }, z.object({}));

  return toTypedSchema(mergedSchema);
});

const onSubmit = (values: unknown) => {
  if (!isLastStep.value) {
    currentStepIdx.value++;
    return;
  }

  emit("submit", values);
};
</script>

<template>
  <Form
    :validation-schema="currentSchema"
    :keep-values="true"
    @submit="onSubmit"
  >
    <slot />
  </Form>
</template>
