// import apiHelper from './apiHelper';
import {useMaps} from '../composables/useMaps';

const {maps} = useMaps();
export default {
  // readPoints(data) {
  //   return apiHelper.httpRequest('/point', {data}, 'post');
  // },
  // createPoint(data) {
  //   return apiHelper.httpRequest('/point', {data}, 'post');
  // },
  // deletePoint(data) {
  //   return apiHelper.httpRequest('/point', {data}, 'post');
  // },

  readPoints() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const points = maps.value.reduce((acc, map) => {
          acc.push(...map.points);
          return acc;
        }, []);
        resolve(points);
      }, 100);
    });
  },
};
