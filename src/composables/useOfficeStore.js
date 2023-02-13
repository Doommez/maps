import {ref} from 'vue';

const idBack = ref(100);

const randomDiapason = (start, end) => Math.floor(
  Math.random() * (end - start + 1),
) + start;
const dataGenerator = (length, params, values) => {
  const array = Array.from(Array(length));
  return array.map((arrayItem, id) => ({
    ...params.reduce((object, param, index) => {
      if (values && values[index]) {
        object[param] = values[index];
        if (values[index] === 'booked') {
          object[param] = Math.random() < 0.5;
        }
        return object;
      }
      if (param === 'id') {
        object[param] = Number((Math.random() * 100000000).toFixed(0));
        return object;
      }
      object[param] = id + 1;
      return object;
    }, {}),
  }));
};

const officeValues = [
  'Офис на пер. Козлова',
  'РБ г. Минск, пер. Козлова, д. 7',
];

const descriptionPlaces = ['тут будет возможное описание ', 'booked'];

const offices = dataGenerator(randomDiapason(1, 10), ['title', 'location', 'id', 'floors'], officeValues);
const floors = offices.map((office) => office.floors = dataGenerator(randomDiapason(1, 10), ['number', 'id', 'rooms']));
floors.forEach((floorsOffice) => {
  floorsOffice.forEach((floor) => floor.rooms = dataGenerator(randomDiapason(1, 10), ['number', 'id', 'places']));
});
floors.forEach((floorsOffice) => {
  floorsOffice.forEach((floor) => floor.rooms.forEach((room) => {
    room.places = dataGenerator(randomDiapason(1, 10), ['description', 'booked', 'number', 'id'], descriptionPlaces);
  }));
});

const dataOffice = ref(offices);
console.log(dataOffice.value);
export const useOfficeStore = () => ({
  idBack,
  dataOffice,
});
