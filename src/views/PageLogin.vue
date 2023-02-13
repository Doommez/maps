<template>
  <div class="login-page">
    <div class="login-page__header header">
      <router-link
        to="/"
        class="header__logo logo"
      >
        <img
          src="../assets/logo.svg"
          alt="logo"
        >
        <img
          src="../assets/titleLogo.svg"
          alt="titleLogo"
        >
      </router-link>
      <div class="header__title">
        maps
      </div>
    </div>
    <div class="login-page__body body">
      <div class="body__content content">
        <div class="content__title">
          Вход в ситсему
        </div>
        <div class="content__wrapper">
          <v-form
            ref="form"
            class="content__form form"
          >
            <v-text-field
              v-model="loginUser"
              variant="outlined"
              placeholder="Your JIRA/WIFI login like ivanov_i"
              class="form__input"
              :rules="rulesForInputs"
            />
            <v-text-field
              v-model="password"
              class="form__input"
              variant="outlined"
              placeholder="Password"
              :type="isShownPassword ? 'password' : 'text'"
              :append-inner-icon="isShownPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rulesForInputs"
              @click:append-inner="changeVisibilityPassword"
            />
            <base-button
              class="form__submit"
              @click.prevent="singIn"
            >
              Войти
            </base-button>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import {useRouter} from 'vue-router';
  import {requiredFieldText, validateForm} from '../helpers/validation';
  import {useLoader} from '../composables/useLoader';
  import {useAuth} from '../composables/useAuth';
  import BaseButton from '../components/BaseButton.vue';


  const router = useRouter();
  const {login} = useAuth();
  const {initLoader, stopLoader} = useLoader();

  const isShownPassword = ref(true);
  const rulesForInputs = [requiredFieldText()];
  const form = ref(null);
  const loginUser = ref('');
  const password = ref('');

  const changeVisibilityPassword = () => {
    isShownPassword.value = !isShownPassword.value;
  };

  const singIn = async () => {
    if (await validateForm(form.value)) {
      const loaderKey = initLoader();
      await login({
        data: {
          login: loginUser.value,
          password: password.value,
        },
        router,
      });
      stopLoader(loaderKey);
    }
  };
</script>

<style lang="scss" scoped>
  @use "src/styles/utils/mixins";
  @use "src/styles/utils/variables";

  .login-page {
    height: 100%;
    &__header {
      background: variables.$white;
      height: 92px;
      box-shadow: 0 4px 28px rgba(50, 63, 86, 0.11);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 32px;
      z-index: 1000;
    }

    &__body {
      max-width: 504px;
      margin: 0 auto;
    }
  }
  .header {
    &__logo {
      display: flex;
      justify-items: center;
      justify-content: center;
      align-content: center;
      height: 50px;
    }

    &__title {
      @include mixins.font-h1-regular;
      color: variables.$grey-mid;
    }
  }

  .content {
    padding: 150px 0;

    &__title {
      margin-bottom: 32px;
      @include mixins.font-h1-bold;
      text-align: center;
    }

    &__wrapper {
      border-radius: 20px;
      padding: 32px;
      background: rgba(255, 255, 255, 0.3);

    }
  }

  .form {
    background: variables.$white;
    padding: 32px;
    border-radius: 10px;

    &__input {
      height: 50px;
      margin-bottom: 35px;
      @include mixins.text-md-semi-bold;
    }

    &__submit {
      width: 100%;
    }
  }
</style>
