<template>
  <div class="management">
    <v-select
      v-model="currentOptionAfter"
      :items="search"
      item-props="title"
      label="поиск интурусуещего места"
    >
      <template #prepend-item>
        <base-input v-model="currentSearch" />
      </template>
    </v-select>
    <base-block>
      <v-icon
        icon="mdi-map-marker-plus"
        class="settings"
        @click="toggleNewPointDialog()"
      />
      <management-tabs
        v-model="windowActive"
        :tabs-props="tabs"
      >
        <template
          v-for="tab in tabs"
          :key="tab.title"
          #[tab.title]
        >
          <div>
            <v-img
              ref="mapField"
              class="map"
              :src="currentMap.url"
              :style="cursorAdding"
            />
            {{ currentMap.component }}
            <div
              v-for="point in points"
              :key="point.id"
              :style="{'top': point.position.y+ '%', 'left': point.position.x + '%'}"
              class="point"
              :class="{'point_active': pointActive === point}"
              @click="toggleDialogInfo(point)"
            >
              <div class="point__name">
                {{ point.shortName }}
              </div>
              <v-icon
                class="point__icon"
                :icon="point.icon"
              />
            </div>
            <div
              v-if="newPoint"
              class="point newPoint"
              :style="{'top': newPoint.position.y+ '%', 'left': newPoint.position.x + '%'}"
            >
              <v-icon
                class="point__icon"
                :icon="newPoint.icon"
              />
            </div>
          </div>
        </template>
      </management-tabs>
      <!--      <v-carousel :show-arrows="false" style="height: 100%" @click="getActiveFloor">-->
      <!--        <v-carousel-item-->
      <!--          v-for="(map,i) in maps"-->
      <!--          :key="i"-->
      <!--          :src="map.url"-->
      <!--          @click="addPoint"-->
      <!--        ></v-carousel-item>-->
      <!--      </v-carousel>-->
      <dialog-edit-point
        v-if="isOpenPopupInfo"
        v-model="isOpenPopupInfo"
        :title="pointActive.name"
        @cancel="unSelectPoint"
      >
        <template #default>
          afdasdf
        </template>
      </dialog-edit-point>
      <dialog-point-adding
        v-if="isOpenDialogAdding"
        v-model="isOpenDialogAdding"
        @add-point="fillPoint"
      />
    </base-block>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref} from 'vue';
  import apiMaps from '../api/apiMaps';
  import BaseBlock from '../components/BaseBlock';
  import BaseInput from '../components/BaseInput.vue';
  import ManagementTabs from '../components/ManagementTabs.vue';
  import DialogPointAdding from '../components/DialogPointAdding.vue';
  import DialogEditPoint from '../components/DialogEditPoint.vue';
  import {useAddPoint} from '../composables/useAddPoint';
  import {useLoader} from '../composables/useLoader';

  // MAP
  const maps = ref([]);

  const mapField = ref(null);

  // TAB
  const tabs = computed(() => maps.value.map((map) => ({
    title: String(map.floor),
    component: map.url,
  })));

  const windowActive = ref('');

  const currentMap = computed(() => {
    const mapIndex = maps.value.findIndex((map) => map.floor === parseInt(windowActive.value));
    return maps.value[mapIndex];
  });

  const points = computed(() => currentMap.value.points.map((point) => point));

  // GET MAPS
  const {initLoader, stopLoader} = useLoader();
  const getMaps = async () => {
    const loaderKey = initLoader();
    maps.value = await apiMaps.readMaps();
    stopLoader(loaderKey);
  };

  onMounted(async () => {
    await getMaps();
    windowActive.value = String(maps.value[0].floor);
  });

  // SEARCH OPTION
  const currentSearch = ref('');

  const currentOption = ref('');

  const pointActive = ref({});

  const options = computed(() => maps.value.reduce((acc, map) => {
    map.points.forEach((point) => {
      acc.push(point.name);
    });
    return acc;
  }, []));

  const search = computed(() => {
    if (currentSearch.value) {
      return options.value.filter((option) => option.toLowerCase().includes(currentSearch.value.toLowerCase()));
    }
    return options.value;
  });

  const setNextFloor = (value) => {
    const mapIndex = maps.value.findIndex((map) => map.points.some((point) => point.name === value));
    const nextFloor = maps.value[mapIndex];
    const pointIndex = nextFloor.points.findIndex((points) => points.name === value);
    pointActive.value = nextFloor.points[pointIndex];
    windowActive.value = String(nextFloor.floor);
  };

  const currentOptionAfter = computed({
    get() {
      return currentOption.value;
    },
    async set(value) {
      currentOption.value = value;
      setNextFloor(value);
    },
  });

  // ADD NEW POINT
  const {setPoint, newPoint} = useAddPoint();

  const addingCallback = () => {
    currentMap.value.points.push(newPoint.value);
  };

  const isOpenDialogAdding = ref(false);

  const toggleNewPointDialog = (isOpen = true) => {
    isOpenDialogAdding.value = isOpen;
  };

  const fillPoint = (point) => {
    toggleNewPointDialog(false);
    setPoint(mapField.value.image, point, addingCallback);
  };

  // CURSOR
  const cursorAdding = computed(() => (newPoint ? {cursor: 'crosshair'} : ''));

  //
  const isOpenPopupInfo = ref(false);

  const selectPoint = (point) => {
    pointActive.value = point;
  };

  const unSelectPoint = () => {
    pointActive.value = null;
  };

  const toggleDialogInfo = (point, isOpen = true) => {
    selectPoint(point);
    isOpenPopupInfo.value = isOpen;
  };

  // POSITIONS


  // const activeFloor = ref(null);
  // const isOpen = ref(false);
  //
  // const newCoords = ref(null);

  // const addPoint = (e) => {
  //   console.log(mapField.value.image);
  //   const top = (((e.clientY - e.target.getBoundingClientRect().y) / mapField.value.image.offsetHeight) * 100).toFixed(0);
  //   const left = (((e.clientX - e.target.getBoundingClientRect().x) / mapField.value.image.offsetWidth) * 100).toFixed(0);
  //   newCoords.value = {
  //     x: left,
  //     y: top,
  //   };
  //   console.log('left', left, 'top', top);
  //   // const rect = mapField.value.getBoundingClientRect();
  //   // const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  //   // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //   // isOpen.value = true;
  // };

  // const createPoint = (point) => {
  //   const newPoint = {
  //     ...point,
  //     id: Math.random() * 100,
  //     position: {
  //       x: newCoords.value.x,
  //       y: newCoords.value.y,
  //     },
  //   };
  //   const mapIndex = maps.value.findIndex((map) => map.floor === parseInt(windowActive.value));
  //   maps.value[mapIndex].points.push(newPoint);
  //   isOpen.value = false;
  //   newCoords.value = null;
  // };



  //
  // const cursorAdding = computed(() => (newPoint ? {cursor: 'crosshair'} : ''));
  //
  // onMounted(() => {
  //   console.log('onMounted', mapField.value);
  // });
  // const showPoint = (floor) => {
  //     const field = document.querySelectorAll('.v-window-item--active .v-responsive.v-img');
  //     const arrayFields = Array.from(field)
  //   console.log(arrayFields)
  //     const mapIndex = maps.value.findIndex((map)=> Number(floor) == map.floor)
  //   let points = ''
  //   maps.value[mapIndex].points.forEach(point =>{
  //     if (point.name){
  //       const div = document.createElement('div')
  //       div.setAttribute('class', 'point')
  //       const span = document.createElement('span');
  //       span.setAttribute('class', 'mdi mdi-map-marker-question-outline')
  //       span.setAttribute('style', 'font-size: 50px')
  //       div.append(span)
  //       div.setAttribute('icon', 'mdi-cancle')
  //       const style = `left: ${point.position.x}px; top: ${point.position.y}px; position: absolute`
  //       div.setAttribute('style', style)
  //       div.addEventListener('click', openInfo)
  //       arrayFields[0].append(div)
  //       setTarget(point.description)
  //     }
  //   })
  // }
  // const getActiveFloor = ()=>{
  //   const activeFloor = document.querySelector('.v-btn--active')
  //   const activeFloorNumber = activeFloor.querySelector('.v-btn__content').innerHTML
  //   showPoint(activeFloorNumber)
  // }
  //
  // onMounted(()=>{
  //   const contentBtn = document.querySelectorAll('.v-carousel__controls .v-btn__content');
  //   contentBtn.forEach((btn, index, arr)=>{
  //       btn.innerHTML = maps.value[index].floor
  //     btn.setAttribute('id', maps.value[index].floor*100)
  //   })
  //   map.value = document.getElementsByClassName('v-img__img')
  //   setTimeout(()=>{
  //     getActiveFloor()
  //     // field.append('<div class="point">aaaa</div>')
  //   }, 300)
  // })
</script>

<style lang="scss" scoped>
  @use "../styles/utils/variables";
  @use 'src/styles/utils/mixins';

  .content {
    display: grid;
    position: relative;
  }

  //:deep(.v-tab.v-tab){
  //  min-width: 60px;
  //}
  //
  //:deep(.v-slide-group__content){
  //  flex-direction: column;
  //}
  //:deep(.content__tabs .tabs .v-tabs){
  //  height: auto;
  //  flex-direction: column;
  //  flex-wrap: nowrap;
  //  align-items: center;
  //}
  :deep(.v-tabs){
    grid-column: 2/3;
    height: auto;
  }
  :deep(.v-window){
    grid-column: 1/2;
    grid-row: 1/2;
  }
  //:deep(.v-slide-group__container){
  //  flex-direction: column;
  //  justify-content: center;
  //  align-items: center;
  //}
  //:deep(.v-slide-group__content){
  //  justify-content: center;
  //  max-width: 60px;
  //}
  //:deep(.v-slide-group__prev){
  //  display: none;
  //}
  //:deep(.v-slide-group__next){
  //  display: none;
  //}

  .content{
    display: grid;
    grid-template-columns: 1fr 60px;
  }
  //:deep(.v-carousel__controls) {
  //  bottom: 0;
  //  list-style-type: none;
  //  left: 95% !important;
  //  top: 50% !important;
  //  position: fixed;
  //  display: flex;
  //  flex-direction: column;
  //  width: 44px;
  //  z-index: 1;
  //  grid-column: 2/3;
  //  background: #effdf452;
  //}
  //
  //:deep(v-window v-theme--light v-carousel) {
  //  display: grid;
  //  grid-template-columns: 1fr 40px;
  //}
  //
  //:deep(.v-carousel__controls .v-btn__content) {
  //  font-size: 24px;
  //  margin-bottom: 15px;
  //}
  //
  //:deep(.v-carousel__controls .v-btn) {
  //  margin-bottom: 20px;
  //  width: 56px;
  //  height: 35px;
  //}
  //
  //:deep(.v-window .v-theme--light .v-carousel) {
  //  height: 100% !important;
  //}
  //
  //:deep(.v-carousel-item > .v-img) {
  //  position: relative;
  //}
  //
  .point {
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
    font-size: 16px;
    transition: font-size 0.3s ease, color 0.3s ease;
    max-width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__name{
      @include mixins.text-sm-bold;
      font-size: 8px;
      transition: font-size 0.5s ease;
    }

    &:hover {
      color: variables.$green;
      font-size: 20px;
      .point__name{
        font-size: 12px;
      }
    }
    &_active {
      color: variables.$purple ;
      font-size: 30px;
    }
  }

  .settings{
    @include mixins.button-icon;
  }

  .newPoint{
    &:after{
      content: '';

    }
  }
</style>
