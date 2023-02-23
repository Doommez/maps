<template>
  <div class="not-found-page">
    <div class="not-found-page__body body">
      <div class="body__content content">
        <div class="content__title">
          Страница не найдена :(
        </div>
        <div class="content__description">
          Что-то пошло не так
        </div>
        <div class="content__action">
          <base-button @click="goBack">
            Вернуться
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {useRouter} from 'vue-router';
  import BaseButton from '../components/BaseButton.vue';

  const router = useRouter();

  const goBack = () => {
    if (window.history.state.back) {
      router.go(-2);
      return;
    }
    router.push({name: 'nav'});
  };
</script>

<style lang="scss" scoped>
  @use "src/styles/utils/mixins";
  @use "src/styles/utils/variables";

  .not-found-page {
    height: 100%;
    display: flex;
    justify-content: center;
    padding-top: 242px;

    &__body {
      border-radius: 20px;
      padding: 32px;
      background: rgba(255, 255, 255, 0.3);
      z-index: 10;
      max-height: 250px;
    }
  }

  .body {
    &__content {
      background-color: variables.$white;
      width: 600px;
      height: 185px;
      z-index: 10;
    }
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__title {
      @include mixins.font-h1-bold;
      margin-bottom: 23px;
    }

    &__description {
      @include mixins.text-md-semi-bold;
    }

    &__action {
      margin-top: 15px;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: calc(100% - 120px + 20px);
      left: calc(100% - 110px);
      background-image: url("../assets/logo.svg");
      background-size: 120px;
      width: 110px;
      height: 100px;
      opacity: 0.2;
      z-index: 9;
    }
  }
</style>
