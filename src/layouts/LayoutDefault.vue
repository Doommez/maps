<template>
  <div class="content">
    <the-navbar class="content__navbar" />
    <the-header class="content__header" />
    <div class="content__main">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import TheNavbar from '../components/TheNavbar.vue';
  import TheHeader from '../components/TheHeader.vue';
</script>

<style lang="scss" scoped>
  @use 'src/styles/utils/variables';

  .content {
    display: grid;
    grid-template-columns: 92px 1fr;
    grid-template-rows: 90px 1fr;
    height: 100%;

    &__navbar {
      grid-column: 1/2;
    }

    &__header {
      grid-column: 2/3;
      grid-row: 1/2;
      z-index: 900;
    }

    &__main {
      grid-column: 2/3;
      grid-row: 2/3;
      background-color: variables.$grey-lighter;
      padding: 0 32px;
      height: 100%;
    }
  }
</style>
