<template>
  <base-dialog
    v-model:is-dialog-open="isOpen"
    title="Создание поинта"
    height="300"
    scrollable
    @confirm="addPoint"
    @cancel="close"
  >
    <template #default>
      <v-form
        ref="form"
        class="form"
      >
        <div class="form__filed field">
          <div class="field__name">
            Name point
          </div>
          <base-input
            v-model="point.name"
            :rules="inputText"
            class="field__input"
          />
        </div>
        <div class="form__filed field">
          <div class="field__name">
            Short name
          </div>
          <base-input
            v-model="point.shortName"
            class="field__input"
          />
        </div>
        <div class="form__filed field">
          <div class="field__name">
            Description
          </div>
          <v-textarea
            v-model="point.description"
            variant="outlined"
            class="field__textarea"
          />
        </div>
        <div class="form__filed field">
          <div class="field__name">
            Icon
          </div>
          <v-select
            v-model="point.icon"
            item-title="title"
            variant="outlined"
            class="field__select"
            placeholder="select icon for point"
            :items="filteredIcons"
          >
            <template #prepend-item>
              <base-input v-model="filter" />
            </template>
            <template #item="{item, props}">
              <v-list-item
                :="props"
                :append-icon="item.value"
              />
            </template>
            <template #selection="{item}">
              <v-icon :icon="item.value" />
            </template>
          </v-select>
        </div>
      </v-form>
    </template>
  </base-dialog>
</template>

<script setup>

  import {
    computed, onBeforeUnmount, ref, watch,
  } from 'vue';
  import BaseDialog from './BaseDialog.vue';
  import BaseInput from './BaseInput.vue';
  import {onlyLongText, requiredFieldText, validateForm} from '../helpers/validation';
  import {ICONS} from '../constants/icons';

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
    shortName: '',
    description: '',
    icon: null,
  });

  // VALIDATION
  const form = ref('');
  const inputText = [requiredFieldText(), onlyLongText()];

  const close = () => {
    emits('close');
  };

  const addPoint = async () => {
    if (await validateForm(form.value)) {
      emits('addPoint', point.value);
    }
  };

  const filter = ref('');

  const icons = computed(() => Object.keys(ICONS).map((icon) => ({
    title: icon,
    value: ICONS[icon],
  })));

  const filteredIcons = computed(() => {
    if (filter.value) {
      return icons.value.filter((icon) => icon.title.includes(filter.value));
    }
    return icons.value;
  });

  watch(point, (value) => {
    console.log(value);
  });

  onBeforeUnmount(() => {
    close();
  });
</script>

<style lang="scss" scoped>
  @use 'src/styles/utils/variables';

  .field{
    &__name{
      color: variables.$grey;
      margin-left: 14px;
      margin-bottom: 10px;
    }
  }
</style>
