<template>
  <div
    v-if="isShownLoader"
    class="overlays"
  >
    <v-progress-circular
      indeterminate
      class="overlays__loader"
    />
  </div>
</template>

<script setup>
  import {useLoader} from '../composables/useLoader';

  const {isShownLoader} = useLoader();
</script>

<style lang="scss" scoped>
  @use '../styles/utils/variables';

  .overlays {
    width: 100vw;
    height: 100%;
    z-index: 10000000;
    position: fixed;
    background-color: variables.$grey-mid-lite;
    opacity: 50%;
    top: 0;
    left: 0;
    &__loader {
      color: variables.$green;
      width: 150px;
      height: 150px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

</style>
