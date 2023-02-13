<template>
  <div class="booking-page" />
</template>

<script setup>

</script>

<style lang="scss" scoped>
  @use 'src/styles/utils/mixins';
  @use 'src/styles/utils/variables';

  .booking-page {
    background-color: variables.$grey-lighter;
    height: 100%;

    &__title {
      @include mixins.font-h1-bold;
      text-align: center;
    }

    &__divider {
      padding: 40px 0;
    }
  }

  .body {
    &__actions {
      display: grid;
      grid-template-columns: 1fr 250px 280px 150px 150px;
      grid-gap: 20px;
      align-items: center;
    }
  }

  .filter {
    display: flex;
    align-items: center;

    &__select {
      margin: 10px 10px 0;
    }
    &__checkbox{
      margin-top: 25px;
    }
  }

  .booking-message {
    text-align: center;
    @include mixins.text-lg-bold;
    margin: 20px 0;
  }
</style>
