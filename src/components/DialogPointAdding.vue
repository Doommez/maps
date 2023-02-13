<template>
  <base-dialog
    v-model:is-dialog-open="isOpen"
    title="Создание поинта"
    @confirm="addPoint"
    @cancel="close"
  >
    <template #default>
      <div>
        <div>
          Имя поинта
        </div>
        <base-input v-model="point.name" />
      </div>
      <div>
        <div>
          описание
        </div>
        <base-input v-model="point.description" />
      </div>
    </template>
  </base-dialog>
</template>

<script setup>

  import {computed, ref} from 'vue';
  import BaseDialog from './BaseDialog.vue';
  import BaseInput from './BaseInput.vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
  });

  const emits = defineEmits([
    'update:modelValue', 'close', 'addPoint',
  ]);

  const isOpen = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits('update:modelValue', value);
    },
  });

  const point = ref({
    name: '',
    description: '',
  });

  const close = () => {
    emits('close');
  };

  const addPoint = () => {
    emits('addPoint', point.value);
  };
</script>

<style lang="scss" scoped>

</style>
