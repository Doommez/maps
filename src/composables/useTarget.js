import {ref, readonly} from 'vue';

export const useTarget = () => {
  const target = ref({});
  const setTarget = (value) => {
    target.value = value;
  };

  const clearTarget = () => {
    target.value = {};
  };

  return {
    target: readonly(target),
    setTarget,
    clearTarget,
  };
};
