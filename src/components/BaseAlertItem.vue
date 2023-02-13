<template>
  <div>
    <v-alert
      v-model="isShown"
      :type="alert.theme"
      variant="outlined"
      closable
      elevation="12"
      :icon="false"
      class="alert"
      :width="width"
    >
      <div class="alert__content content">
        <div
          class="content__icon"
          :class="alert.theme"
        >
          <span v-if="alert.theme === 'success'">
            &#128077;
          </span>
          <span v-else>
            &#128549;
          </span>
        </div>
        <div class="content__text">
          {{ alert.message }}
        </div>
      </div>
    </v-alert>
  </div>
</template>

<script setup>
  import {computed, onMounted} from 'vue';

  const props = defineProps({
    alert: {
      type: Object,
      required: true,
    },
    width: {
      type: [Number, String],
      default: '400',
    },
    isShown: {
      type: Boolean,
      default: true,
    },
  });

  const emits = defineEmits([
    'close',
  ]);

  const isShown = computed({
    get() {
      return props.alert.isShown;
    },
    set() {
      emits('close', props.alert.key);
    },
  });

  onMounted(() => {
    setTimeout(() => {
      emits('close', props.alert.key);
    }, props.alert.delay);
  });


</script>

<style lang="scss" scoped>
  @use 'src/styles/utils/mixins';
  @use "src/styles/utils/variables";

  .alert {
    padding: 16px 20px;
    cursor: pointer;
    background: variables.$white;

    &__content {
      display: grid;
      grid-template-columns: 40px 1fr;
      grid-gap: 12px;
      align-items: center;
    }
  }

  .content {
    &__text {
      @include mixins.text-lg-bold;
    }

    &__icon {
      width: 40px;
      height: 40px;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      justify-items: center;
      margin-right: 12px;
    }
  }

  .success {
    background-color: variables.$green-lite;
  }

  .error {
    & + .content__body {
      color: variables.$red;
    }

    background-color: variables.$red-lite;
  }
</style>
