<template>
  <base-dialog
    v-model:is-dialog-open="isOpen"
    :title="title"
    is-shown-confirm-button
    is-shown-cancel-button
    @cancel="cancel"
    @confirm="confirm"
  />
</template>

<script setup>
  import {computed, onBeforeUnmount} from 'vue';
  import BaseDialog from './BaseDialog.vue';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    isShownConfirmButton: {
      type: Boolean,
      default: true,
    },
  });

  const emits = defineEmits([
    'confirm', 'cancel', 'update:modelValue',
  ]);

  const isOpen = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits('update:modelValue', value);
    },
  });

  const cancel = () => {
    emits('cancel');
  };

  const confirm = () => {
    emits('confirm');
  };

  onBeforeUnmount(() => {
    cancel();
  });

</script>

<style lang="scss" scoped>

</style>
