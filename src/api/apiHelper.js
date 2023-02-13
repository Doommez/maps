import axios from 'axios';
import {useRouter} from 'vue-router';
import {useAuth} from '../composables/useAuth';
import cookie from '../services/cookie';

const baseURL = `${import.meta.env.VUE_APP_API_PROTOCOL}://${import.meta.env.VUE_APP_API_HOST}:${import.meta.env.VUE_APP_API_PORT}`;
const config = {
  baseURL,
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use((axiosConfig) => {
  axiosConfig.headers.Authorization = `Bearer ${cookie.get('jwt')}`;
  return axiosConfig;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === '401') {
      const router = useRouter();
      const {logout} = useAuth();
      logout(router);
    }
  },
);
export default {
  httpRequest(url, body = {}, method = 'get', options = {}) {
    return axiosInstance[method](url, body, options);
  },
};
