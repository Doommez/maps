<template>
  <div class="management">
    <v-select
      v-model="currentOptionAfter"
      :items="filter"
      item-props="title"
      label="поиск интурусуещего места"
    >
      <template #prepend-item>
        <base-input v-model="currentFilter" />
      </template>
    </v-select>
    <base-block>
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
            <img
              ref="mapField"
              class="map"
              :src="tab.component"
              @click="addPoint"
            >
            <div
              v-for="point in points"
              :key="point.id"
              :style="{'top': point.position.y+ '%', 'left': point.position.x + '%'}"
              class="point"
              :class="{'point_active': pointActive === point}"
              @click="openInfo"
            >
              <v-icon icon="mdi-map-marker-question-outline" />
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
      <base-dialog
        v-model:is-dialog-open="isOpenPopupInfo"
        :is-shown-cancel-button="false"
        :is-shown-confirm-button="false"
        @cancel="clearTarget"
      >
        <template #default>
          <div>
            {{ target }}
          </div>
        </template>
      </base-dialog>
      <dialog-point-adding
        v-model="isOpen"
        @add-point="createPoint"
      />
    </base-block>
  </div>
</template>

<script setup>
  import { computed, ref} from 'vue';
  import {useTarget} from '../composables/useTarget';
  import BaseBlock from '../components/BaseBlock';
  import {useMaps} from '../composables/useMaps';
  import BaseDialog from '../components/BaseDialog.vue';
  import BaseInput from '../components/BaseInput.vue';
  import ManagementTabs from '../components/ManagementTabs.vue';
  import DialogPointAdding from '../components/DialogPointAdding.vue';

  const {target, setTarget, clearTarget} = useTarget();

  const {maps} = useMaps();

  const mapField = ref(null);

  const tabs = computed(() => maps.value.map((map) => ({
    title: String(map.floor),
    component: map.url,
  })));

  const windowActive = ref(String(maps.value[0].floor));

  const currentFilter = ref('');

  const newCoords = ref(null);

  const options = computed(() => {
    if (!newCoords.value) {
      return maps.value.reduce((acc, map) => {
        map.points.forEach((point) => {
          acc.push(point.name);
        });
        return acc;
      }, []);
    }
  });

  const filter = computed(() => {
    if (currentFilter.value) {
      return options.value.filter((option) => option.toLowerCase().includes(currentFilter.value.toLowerCase()));
    }
    return options.value;
  });

  const currentOption = ref('');

  const pointActive = ref({});

  const currentOptionAfter = computed({
    get() {
      return currentOption.value;
    },
    async set(value) {
      currentOption.value = value;
      const mapIndex = maps.value.findIndex((map) => map.points.some((point) => point.name === value));
      const nextFloor = maps.value[mapIndex];
      const pointIndex = nextFloor.points.findIndex((points) => points.name === value);
      pointActive.value = nextFloor.points[pointIndex];
      windowActive.value = String(nextFloor.floor);
      currentFilter.value = '';
    },
  });

  // const activeFloor = ref(null);
  const isOpen = ref(false);

  const addPoint = (e) => {
    const top = (((e.clientY - e.target.getBoundingClientRect().y) / mapField.value.offsetHeight) * 100).toFixed(0);
    const left = (((e.clientX - e.target.getBoundingClientRect().x) / mapField.value.offsetWidth) * 100).toFixed(0);
    newCoords.value = {
      x: left,
      y: top,
    };
    // const rect = mapField.value.getBoundingClientRect();
    // const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    isOpen.value = true;
  };

  const createPoint = (point) => {
    const newPoint = {
      ...point,
      id: Math.random() * 100,
      position: {
        x: newCoords.value.x,
        y: newCoords.value.y,
      },
    };
    const mapIndex = maps.value.findIndex((map) => map.floor === parseInt(windowActive.value));
    maps.value[mapIndex].points.push(newPoint);
    isOpen.value = false;
    newCoords.value = null;
  };

  // computed render points
  const points = computed(() => {
    if (!newCoords.value) {
      const mapIndex = maps.value.findIndex((map) => Number(windowActive.value) === map.floor);
      return maps.value[mapIndex].points.map((point) => {
        if (point.name) {
          setTarget(point.description);
        }
        return point;
      });
    }
  });

  // open info
  const isOpenPopupInfo = ref(false);

  const openInfo = () => {
    isOpenPopupInfo.value = true;
  };

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

  :deep(.v-slide-group__content){
    flex-direction: column;
  }
  :deep(.content__tabs .tabs .v-tabs){
    height: auto;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  :deep(.v-tabs){
    position: absolute;
    top: 300px;
    left:95%;
    height: auto;
  }
  :deep(.v-window){
    grid-column: 1/2;
    grid-row: 1/2;
  }
  :deep(.v-slide-group__container){
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  :deep(.v-slide-group__content){
    justify-content: center;
  }
  :deep(.v-slide-group__prev){
    display: none;
  }
  :deep(.v-slide-group__next){
    display: none;
  }

  .map{
    width: 100%;
  }
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
    font-size: 20px;
    transition: all 0.3s ease;

    &:hover {
      color: #337e4e;
    }
    &_active {
      color: purple ;
      font-size: 40px;
    }
  }

</style>
