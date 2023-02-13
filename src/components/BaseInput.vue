<template>
  <div
    class="base-input"
    :class="{disabled}"
  >
    <v-text-field
      v-model="model"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :label="label"
      :rules="rules"
      variant="outlined"
      hide-details="auto"
      class="base-input__text"
    />
  </div>
</template>

<script setup>
  import {computed} from 'vue';

  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => ([]),
    },
  });

  const emits = defineEmits([
    'update:modelValue',
  ]);

  const model = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      return emits('update:modelValue', value);
    },
  });
</script>

<style lang="scss" scoped>
  @use '../styles/utils/mixins';
  @use '../styles/utils/variables';

  .base-input {
    width: 100%;
  }

  .disabled {
    background: variables.$grey-lighter;
    color: variables.$grey-mid-lite;
    border: none;

    &:hover {
      box-shadow: none;
    }
  }

  :deep(.v-field__input) {
    @include mixins.text-lg-regular
  }

  :deep(.v-field__input:hover ) {
    box-shadow: 0 4px 21px rgba(50, 63, 86, 0.11);
  }
</style>
