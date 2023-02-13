<template>
  <div class="content">
    <div class="content__main">
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>

  .content {
    height: 100vh;
    width: 100%;

    &__main {
      height: 100%;
      background-image: radial-gradient(circle at left bottom, rgba(160, 219, 156, 0.97) 0%, rgba(63, 94, 251, 0.03) 50%),
      radial-gradient(circle at right top, rgba(100, 97, 255, 0.15) 0%, rgba(100, 97, 255, 0) 50%);
    }
  }
</style>
