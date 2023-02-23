// import apiHelper from './apiHelper';
import {useMaps} from '../composables/useMaps';

const {maps} = useMaps();
export default {
  // readMaps() {
  //   return apiHelper.httpRequest('/maps', {}, 'get');
  // },

  readMaps() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(maps.value);
      }, 1000);
    });
  },
};
