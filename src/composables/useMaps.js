import {ref} from 'vue';

'mdi-map-marker-question-outline'

const maps = ref([
  {
    url: 'floor_4.png',
    floor: 4,
    points: [
      {
        id: 4,
        name: 'Meeting room',
        shortName: 'Meeting',
        icon: 'mdi-wechat',
        description: 'переговорка доступна с 8:00',
        position: {
          x: 82,
          y: 30,
        },
      },
    ],
  },
  {
    url: 'floor_5.svg',
    floor: 5,
    points: [
      {
        id: 5,
        name: 'Accounting and legal department',
        shortName: 'A&L dep',
        icon: 'mdi-scale-balance',
        description: 'email: legal@belitsot.com',
        position: {
          x: 38,
          y: 82,
        },
      },
    ],
  },
  {
    url: 'floor_7.png',
    floor: 7,
    points: [
      {
        id: 7,
        name: 'Coworking',
        shortName: 'Coworking',
        icon: 'mdi-chair-rolling',
        description: 'workTime',
        position: {
          x: 40,
          y: 37,
        },
      },
    ],
  },
  {
    url: 'floor_9.png',
    floor: 9,
    points: [
      {
        id: 9,
        name: 'System administrator',
        shortName: 'S. admin',
        icon: 'mdi-account-wrench-outline',
        description: 'workTime',
        position: {
          x: 68,
          y: 12,
        },
      },
    ],
  },
  {
    url: 'floor_10.png',
    floor: 10,
    points: [
      {
        name: 'Office managers',
        shortName: 'Office m',
        icon: 'mdi-office-building-cog-outline',
        description: 'workTime',
        position: {
          x: 34,
          y: 56,
        },
      },
    ],
  },
]);

export const useMaps = () => {
  const setPoint = (data, floor) => {
    const mapIndex = maps.value.findIndex((map) => map.floor === floor);
    maps.value[mapIndex].points.push(data);
  };
  const getNames = () => maps.value.map((map) => {
    const names = [];
    console.log(map);
    map.points.forEach((point) => {
      console.log(point.id);
      names.push({
        name: point.name,
        floor: point.id,
      });
    });
    console.log(names);
    return names;
  });
  return {
    maps,
    setPoint,
    getNames,
  };
};
