<template>
  <transition-group
    class="list-alert"
    name="list"
    tag="div"
  >
    <base-alert-item
      v-for="alert in alerts"
      :key="alert.key"
      :alert="alert"
      width="630"
      class="list-alert__item"
      @close="deleteAlert"
    />
  </transition-group>
</template>

<script setup>
  import BaseAlertItem from './BaseAlertItem.vue';
  import {useAlert} from '../composables/useAlert';

  const {alerts, clearAlert} = useAlert();

  const deleteAlert = (key) => {
    clearAlert(key);
  };
</script>

<style lang="scss" scoped>
  .list-alert {
    position: fixed;
    width: 630px;
    left: 50%;
    top: 80%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template-rows: repeat( auto-fit, minmax(50px, 1fr) );
    grid-gap: 20px;
    background: rgba(0, 0, 0, 0%);

    &__item {
      display: inline-block;
      transition: all 0.8s ease;
    }
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 1s ease;
  }

  .list-leave-active {
    position: absolute;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

</style>
