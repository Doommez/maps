import {ref} from 'vue';

const maps = ref([
  {
    url: '/floor_4.png',
    floor: 4,
    points: [
      {
        id: 4,
        name: 'Meeting room',
        icon: 'href',
        description: 'переговорка доступна с 8:00',
        position: {
          x: 90,
          y: 25,
        },
      },
    ],
  },
  {
    url: '/floor_5.png',
    floor: 5,
    points: [
      {
        id: 5,
        name: 'Accounting and legal department',
        icon: 'href',
        description: 'email: legal@belitsot.com',
        position: {
          x: 23,
          y: 88,
        },
      },
    ],
  },
  {
    url: '/floor_7.png',
    floor: 7,
    points: [
      {
        id: 7,
        name: 'Coworking',
        icon: 'href',
        description: 'workTime',
        position: {
          x: 32,
          y: 38,
        },
      },
    ],
  },
  {
    url: '/floor_9.png',
    floor: 9,
    points: [
      {
        id: 9,
        name: 'System administrator',
        icon: 'href',
        description: 'workTime',
        position: {
          x: 81,
          y: 10,
        },
      },
    ],
  },
  {
    url: '/floor_10.png',
    floor: 10,
    points: [
      {
        name: 'Office managers',
        description: 'workTime',
        position: {
          x: 9,
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
