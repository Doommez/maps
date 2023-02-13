<template>
  <v-layout>
    <v-navigation-drawer
      permanent
      expand-on-hover
      rail-width="92"
      rail
      elevation="8"
      width="300"
    >
      <div class="navbar">
        <router-link
          to="/maps/"
          class="navbar__img"
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
        <v-list
          density="compact"
          nav
          class="navbar__action action"
        >
          <v-list-item
            v-for="link in links"
            :key="link.name"
            class="action__list list"
          >
            <router-link
              :to="`${link.path}`"
              class="list__link"
            >
              <v-btn
                variant="text"
                :class="{activeLink: $route.path === link.path}"
                class="list__button button"
              >
                <v-icon
                  :icon="`mdi-${link.meta.icon}`"
                  class="button__icon"
                />
                <span class="button__text">{{ link.meta.titleShort }}</span>
              </v-btn>
            </router-link>
          </v-list-item>
          <slot name="link" />
        </v-list>
      </div>
      <template #append>
        <v-list
          density="compact"
          nav
          class="action logout"
        >
          <v-divider class="action__divider" />
          <v-list-item class="action__list list">
            <v-btn
              variant="text"
              class="list__button button"
              @click="logout(router)"
            >
              <v-icon
                icon="mdi-logout"
                class="button__icon"
              />
              <span class="button__text">Выход</span>
            </v-btn>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup>
  import {useRouter} from 'vue-router';
  import {computed} from 'vue';
  import {useAuth} from '../composables/useAuth';
  import {usePermissions} from '../composables/usePermissions';

  const router = useRouter();
  const {logout} = useAuth();
  const {can} = usePermissions();

  const links = computed(() => router.options.routes.reduce((routes, route) => {
    if (can(...route.meta.permission) && route.meta.isVisible) {
      routes.push(route);
    }
    return routes;
  }, []));
</script>

<style lang="scss" scoped>
  @use "../styles/utils/variables";
  @use '../styles/utils/mixins' as mixins;

  .navbar {
    background-color: variables.$white;
    display: flex;
    flex-direction: column;
    align-items: start;
    min-width: 300px;

    &__img {
      width: 44px;
      margin: 24px 24px 0;
      display: flex;
      align-items: center;
    }
  }

  .action {
    padding: 50px 0;

    &__list {
      padding: 0;
      min-width: 300px;
      overflow: hidden;

      &:not(.v-icon):hover {
        transition: .25s ease;
        background-color: variables.$green-lite;
      }
    }

    :deep(.v-list-item) {
      margin-bottom: 28px !important;
    }
  }

  .list {
    &__button {
      width: 100%;
      padding: 24px 0;
      display: flex;
      justify-content: start;
      border-left: 4px solid rgba(0, 0, 0, 0);
    }

    &__link {
      text-decoration: none;
      color: variables.$grey-dark;
    }
  }

  .button {
    &__icon {
      @include mixins.text-lg-bold;
      margin: 33px 36px;
    }

    &__text {
      @include mixins.text-sm-bold;
    }

    :deep(.v-chip) {
      padding: 0 !important;
    }
  }

  .logout{
    padding: 0 0 50px 0;
  }

  .activeLink {
    background-color: variables.$green-lite;
    border-left: 4px solid variables.$green;
  }
</style>
