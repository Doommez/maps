import { onUnmounted, ref, shallowRef} from 'vue';

export const useAddPoint = () => {
  const newPoint = ref(null);

  const field = shallowRef(null);

  const callback = shallowRef(null);

  const resetPoint = () => newPoint.value = null;

  const movePoint = (event) => {
    const target = event.target;
    const y = ((((event.clientY - target.getBoundingClientRect().y) - 20) / field.value.offsetHeight) * 100);
    const x = (((event.clientX - event.target.getBoundingClientRect().x) / field.value.offsetWidth) * 100);
    newPoint.value.position = {
      x,
      y,
    };
  };

  const deleteEvents = () => {
    resetPoint();
    field.value.removeEventListener('mousemove', movePoint);
    field.value.removeEventListener('click', callback.value);
  };

  const stop = (event) => {
    if (event.key && event.key === 'Escape') {
      deleteEvents();
      window.removeEventListener('keydown', stop);
    }
  };

  const addPoint = async (addingCallback) => {
    field.value.removeEventListener('mousemove', movePoint);
    await addingCallback();
    resetPoint();
    field.value.removeEventListener('click', callback.value);
  };

  const setPoint = (mapFiled, point, addingCallback) => {
    field.value = mapFiled;
    callback.value = addPoint.bind(null, addingCallback);
    newPoint.value = {
      ...point,
      position: {
        x: 0,
        y: 0,
      },
    };
    field.value.addEventListener('mousemove', movePoint);
    field.value.addEventListener('click', callback.value);
    window.addEventListener('keydown', stop);
  };

  onUnmounted(() => {
    if (field.value) {
      deleteEvents();
    }
  });

  return {
    setPoint,
    newPoint,
  };
};
