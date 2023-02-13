import {ref} from 'vue';

const alerts = ref([]);
export const useAlert = () => {
  const showAlert = (alert = {}) => {
    const baseAlert = {
      theme: 'success',
      message: 'Изменения успешно сохранены',
      delay: 3000,
      key: new Date().getTime(),
    };
    alerts.value.push(Object.assign(baseAlert, alert));
  };

  const clearAlert = (dataValue) => {
    const indexAlert = alerts.value.findIndex((alert) => alert.key === dataValue);
    alerts.value.splice(indexAlert, 1);
  };

  return {
    showAlert,
    clearAlert,
    alerts,
  };
};
