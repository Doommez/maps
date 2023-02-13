<template>
  <div class="header">
    <div class="header__title">
      {{ router.currentRoute.value.meta.title ? router.currentRoute.value.meta.title : title }}
    </div>
    <slot />
    <div class="header__bread-crumbs">
      <v-breadcrumbs :items="breadCrumbs">
        <template #title="{ item }">
          <router-link
            :to="item.path"
            :class="{disabled: item.disabled}"
          >
            {{ item.title.toUpperCase() }}
          </router-link>
        </template>
      </v-breadcrumbs>
    </div>
  </div>
</template>

<script setup>
  import {useRouter} from 'vue-router';
  import {useBreadCrumbs} from '../composables/useBreadCrumbs';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
  });

  const router = useRouter();
  const {breadCrumbs} = useBreadCrumbs();
</script>

<style lang="scss" scoped>
  @use "../styles/utils/variables";
  @use '../styles/utils/mixins' as mixins;

  .header {
    background-color: variables.$grey-lighter;
    padding: 0 30px;
    min-height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: sticky;
    top: 0;

    &__title {
      padding: 10px 16px 0;
      @include mixins.font-h2-bold;
    }

    &__bread-crumbs {
      padding: 0;
      @include mixins.text-link;
      font-size: 14px;

      :visited {
        @include mixins.text-link;
      }

      .disabled {
        color: variables.$grey-mid;
      }
    }
  }
</style>
