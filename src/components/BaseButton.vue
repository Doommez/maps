<template>
  <button
    class="base-button"
    :class="rootClasses"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
  import {computed} from 'vue';

  const props = defineProps({
    theme: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'primary-small', 'secondary', 'secondary-small'].includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const rootClasses = computed(() => {
    const classes = [];
    classes.push(`base-button_${props.theme}`);
    if (props.disabled) {
      classes.push('disabled');
    }
    return classes;
  });
</script>

<style lang="scss" scoped>
  @use "../styles/utils/variables";
  @use '../styles/utils/mixins';

  @mixin size-normal {
    padding: 16px 24px;
  }

  @mixin size-small {
    padding: 8px 16px;
  }

  @mixin green-button {
    background: variables.$green;
    @include mixins.text-lg-bold;
    color: variables.$white;
    &:active {
      background: variables.$green-mid;
    }
  }

  .base-button {
    transition: .3s ease;
    border-radius: 4px;
    border: 2px solid;

    &_primary {
      border: variables.$green;
      box-shadow: 0 8px 11px variables.$green-mid-lite;
      @include size-normal;
      @include green-button;

      &:hover {
        background: variables.$green-mid-lite;
        box-shadow: 0 8px 11px variables.$green-mid;
        border: variables.$green-mid-lite;
      }

      &:active {
        box-shadow: 0 8px 11px variables.$green-mid;
        border: variables.$green-mid;
      }
    }

    &_primary-small {
      @include green-button;
      @include size-small;

      &:hover {
        background: variables.$green-mid;
      }

      &:active {
        background: variables.$green-mid;
      }
    }

    &_secondary {
      @include mixins.text-lg-bold;
      border: 2px solid variables.$grey-dark;
      @include size-normal;

      &:hover {
        background: variables.$grey-mid-lite;
      }

      &:active {
        background: variables.$grey-mid-lite;
      }
    }

    &_secondary-small {
      @include mixins.text-md-semi-bold;
      @include size-small;

      &:hover {
        background: variables.$grey-mid-lite;
      }

      &:active {
        background: variables.$grey-mid-lite;
      }
    }
  }

  .disabled {
    background: variables.$grey-mid-lite;
    box-shadow: none;
    color: variables.$grey-mid;

    &:hover {
      background: variables.$grey-mid-lite;
      box-shadow: none;
      color: variables.$grey-mid;
    }
  }
</style>
