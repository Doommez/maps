import {computed, ref} from 'vue';

const loaders = ref([]);

export const useLoader = () => {
  const initLoader = () => {
    const key = new Date().getTime();
    loaders.value.push(key);
    return key;
  };

  const isShownLoader = computed(() => loaders.value.length > 0);

  const stopLoader = (loaderKey) => {
    if (loaders.value.length) {
      const loaderIndex = loaders.value.findIndex((key) => key === loaderKey);
      loaders.value.splice(loaderIndex, 1);
    }
  };

  const clearLoaders = () => {
    loaders.value.splice(0, loaders.value.length);
  };

  return {
    isShownLoader,
    initLoader,
    stopLoader,
    clearLoaders,
  };
};
