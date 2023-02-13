<template>
  <v-dialog
    v-model="isOpen"
    class="dialog"
    :style="{width}"
  >
    <div class="dialog__content content">
      <div class="content__title">
        <div>{{ title }}</div>
        <div class="content__title_cancel">
          <button @click="closeDialog">
            <v-icon icon="mdi-close" />
          </button>
        </div>
      </div>

      <div class="content__body">
        <slot />
      </div>
      <div class="content__footer footer">
        <slot name="footer">
          <div class="footer__action">
            <base-button
              v-if="isShownCancelButton"
              theme="secondary"
              class="footer__action_cancel"
              @click="closeDialog"
            >
              {{ cancelButtonText }}
            </base-button>
            <base-button
              v-if="isShownConfirmButton"
              class="footer__action_confirm"
              @click="confirm"
            >
              {{ confirmButtonText }}
            </base-button>
          </div>
        </slot>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
  import {computed} from 'vue';
  import BaseButton from './BaseButton.vue';

  const props = defineProps({
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '620px',
    },
    cancelButtonText: {
      type: String,
      default: 'Отмена',
    },
    confirmButtonText: {
      type: String,
      default: 'Подтвердить',
    },
    isShownCancelButton: {
      type: Boolean,
      default: true,
    },
    isShownConfirmButton: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
  });
  const emits = defineEmits([
    'confirm', 'update:isDialogOpen', 'cancel',
  ]);

  const isOpen = computed({
    get() {
      return props.isDialogOpen;
    },
    set(value) {
      return emits('update:isDialogOpen', value);
    },
  });

  const confirm = (value) => {
    emits('confirm', value);
  };

  const closeDialog = (value) => {
    emits('cancel', value);
    isOpen.value = false;
  };
</script>

<style lang="scss" scoped>
  @use '../styles/utils/mixins';
  @use '../styles/utils/variables';

  .dialog {

    &__content {
      background-color: variables.$white;
      display: flex;
      flex-direction: column;
      padding: 44px 44px;
      box-shadow: 0 21px 24px rgba(50, 63, 86, 0.13);
      border-radius: 20px;
    }
  }

  .content {
    display: flex;

    &__title {
      @include mixins.font-h1-bold;
      display: grid;
      grid-template-columns: 1fr 20px;
      justify-items: center;
      align-items: center;
      margin-bottom: 32px;

      &_cancel {
        @include mixins.font-h1-regular;
        grid-column: 2/3;

        button {
          font-size: 18px;
        }

        font-size: 18px;
      }
    }

    &__body {
      margin-bottom: 24px;
    }
  }

  .footer {
    display: flex;
    justify-content: end;

    &__action {
      &_confirm {
        margin-left: 20px;
      }
    }
  }

  .dialog__content {
    box-shadow: 0 21px 24px rgba(50, 63, 86, 0.13);
    border-radius: 20px;
  }
</style>
