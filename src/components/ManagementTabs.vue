<template>
  <div class="content">
    <v-tabs
      v-model="tab"
      class="content__tabs tabs"
      align-tabs="start"
    >
      <v-tab
        v-for="tabItem in tabsProps"
        :key="tabItem.title"
        :value="tabItem.title"
        class="tabs__tab tab"
      >
        <div :class="tab === tabItem.title? 'tab__text_active': 'tab__text'">
          {{ tabItem.title }}
        </div>
      </v-tab>
    </v-tabs>
    <v-window
      v-model="tab"
      class="content__sections sections"
    >
      <v-window-item
        v-for="tabItem in tabsProps"
        :key="tabItem.title"
        :value="tabItem.title"
        class="sections__component component"
      >
        <slot :name="tabItem.title">
          {{ tabItem.title }}
        </slot>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
  import {computed} from 'vue';

  const props = defineProps({
    tabsProps: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  });

  const emits = defineEmits([
    'update:modelValue',
  ]);

  const tab = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits('update:modelValue', value);
    },
  });
</script>

<style lang="scss" scoped>
  @use '../styles/utils/mixins';
  @use '../styles/utils/variables';

  .content {
    margin-bottom: 32px;
    position: relative;

    &__tabs {
      margin-bottom: 32px;
    }
  }

  .tab {
    margin-right: 24px;

    &__text {
      @include mixins.font-h2-bold;
      font-weight: 400;
      color: variables.$grey-mid;

      &_active {
        @include mixins.font-h2-bold;
      }
    }
  }

  :deep(.v-btn--size-default) {
    padding: 0;
  }

  :deep(.v-btn) {
    @include mixins.font-h2-bold;
    letter-spacing: 0;
    text-transform: none;
  }

  :deep(v-btn__content) {
    color: variables.$grey-dark;
    font-weight: 700;
  }
</style>
