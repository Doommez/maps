<template>
  <div class="app">
    <component :is="layout">
      <router-view />
    </component>
    <base-alert />
    <base-loader />
  </div>
</template>

<script setup>
  import {
    computed, onErrorCaptured, onMounted, shallowRef, watch,
  } from 'vue';
  import {useRoute, useRouter} from 'vue-router';
  import {useAuth} from './composables/useAuth';
  import {useLoader} from './composables/useLoader';
  import BaseAlert from './components/BaseAlert.vue';
  import BaseLoader from './components/BaseLoader.vue';
  import {LAYOUT_DEFAULT} from './constants/layouts';

  const router = useRouter();
  const route = useRoute();
  const {whoIAm} = useAuth();
  const {clearLoaders} = useLoader();
  const layout = shallowRef(null);

  const layoutName = computed(() => (route.meta.layout || LAYOUT_DEFAULT));

  watch(
    computed(() => route.path),
    async () => {
      const component = await import(`./layouts/${layoutName.value}.vue`);
      layout.value = component.default;
    },
    {
      deep: true,
    },
  );

  onMounted(async () => {
    await whoIAm();
  });

  // onErrorCaptured(async () => {
  //   await router.push({name: 'notFound'});
  //   clearLoaders();
  // });
</script>

<style lang="scss" scoped>
  .app{
    height: 100%;
  }
</style>
