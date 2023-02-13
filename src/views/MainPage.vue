<template>
  <div class="body">
    <div class="body__wrapper wrapper">
      <div class="wrapper__content content">
        <div class="content__title">
          Maps.BelItSoft
        </div>
        <div class="content__main">
          Добро пожаловать в сервис по навигации в оифсе!
        </div>
        <div class="content__actions action">
          <router-link
            class="action__link"
            :to="{name:'nav'}"
          >
            <base-button>
              Перейти к картам
            </base-button>
          </router-link>
          <router-link
            class="action__link"
            :to="{name: 'login'}"
          >
            <base-button>
              Войти в систему
            </base-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseButton from '../components/BaseButton.vue';
</script>

<style lang="scss" scoped>
  @use "src/styles/utils/mixins";
  @use "src/styles/utils/variables";

  .body {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &__wrapper {
      border-radius: 20px;
      padding: 32px;
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .content {
    padding: 32px;
    background-color: variables.$white;

    &__title {
      text-align: center;
      @include mixins.font-h1-bold;
      margin: 20px 0;
    }

    &__main {
      @include mixins.text-sm-bold;
      text-align: center;
      margin: 20px 0;
    }

    &__actions {
      display: flex;
      justify-content: space-between;
    }
  }

  .action {
    &__link {
      margin: 20px;
    }
  }
</style>
