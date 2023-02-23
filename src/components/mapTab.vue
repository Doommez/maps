<template>
  <div>
    <!--    <svg-->
    <!--      xmlns="http://www.w3.org/2000/svg"-->
    <!--      class="map"-->
    <!--      viewBox="0 0 1000 5000"-->
    <!--    >-->
    <!--      <image-->
    <!--        x="0"-->
    <!--        y="5"-->
    <!--        class="map"-->
    <!--        :href="tab.url"-->
    <!--      />-->
    <!--    </svg>-->
    <v-img
      ref="mapField"
      class="map"
      :src="tab.url"
      :style="cursorAdding"
    />
    {{ tab.component }}
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

<script setup>

  import {computed, onMounted, ref} from 'vue';
  import {useAddPoint} from '../composables/useAddPoint';
  import DialogPointAdding from './DialogPointAdding.vue';

  // const props = defineProps({
  //   tab: {
  //     type: Object,
  //     required: true,
  //   },
  // });
  //
  // const pointActive = ref({});
  //
  // const mapField = ref('');
  //
  // const points = computed(() => props.tab.points.map((point) => point));
  //
  // // open info
  // const isOpenPopupInfo = ref(false);
  //
  // const selectPoint = (point) => {
  //   pointActive.value = point;
  // };
  //
  // const unSelectPoint = () => {
  //   pointActive.value = null;
  // };
  //
  // const toggleDialogInfo = (point, isOpen = true) => {
  //   selectPoint(point);
  //   isOpenPopupInfo.value = isOpen;
  // };
  //
  // const {setPoint, newPoint} = useAddPoint();
  //
  //
  // const addingCallback = () => {
  //   props.tab.points.push(newPoint.value);
  // };
  //
  // const isOpenDialogAdding = ref(false);
  //
  // const toggleNewPointDialog = (isOpen = true) => {
  //   isOpenDialogAdding.value = isOpen;
  // };
  //
  // const fillPoint = (point) => {
  //   toggleNewPointDialog(false);
  //   setPoint(mapField.value.image, point, addingCallback);
  // };
  //
  // const cursorAdding = computed(() => (newPoint ? {cursor: 'crosshair'} : ''));
  //
  // onMounted(() => {
  //   console.log('onMounted', mapField.value);
  // });

</script>

<style lang="scss" scoped>
  @use "../styles/utils/variables";
  @use 'src/styles/utils/mixins';

  .map{
    width: 100%;
    object-fit: contain;
  }

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

    &__name {
      @include mixins.text-sm-bold;
      font-size: 8px;
      transition: font-size 0.5s ease;
    }

    &:hover {
      color: variables.$green;
      font-size: 20px;

      .point__name {
        font-size: 12px;
      }
    }

    &_active {
      color: variables.$purple;
      font-size: 30px;
    }
  }

  .settings {
    @include mixins.button-icon;
  }

  .newPoint {
    &:after {
      content: '';
    }
  }

  @media all and (max-width: 700px) {
    .point {
      font-size: 8px;
      max-width: 30px;

      &__name {
        font-size: 4px;
      }

      &:hover {
        font-size: 10px;

        .point__name {
          font-size: 6px;
        }
      }

      &_active {
        font-size: 15px;
      }
    }
  }
</style>
