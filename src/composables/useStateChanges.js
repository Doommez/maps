import {
  computed, onUnmounted, ref, shallowRef, watch,
} from 'vue';

const states = ref([]);

const subscribers = ref([]);

export const useStateChanges = () => {
  // id for subscriber
  const id = new Date().getTime();

  // key/name used
  const currentStateName = shallowRef('');

  // is it observing changes or creating changes
  const isCreator = shallowRef(false);

  // index current state
  const stateIndex = computed(() => states.value.findIndex((state) => state.stateName === currentStateName.value));

  // current state
  const state = computed(() => states.value[stateIndex.value]);

  // subscribers only current state
  const currentSubscribers = computed(() => subscribers.value.filter((subscriber) => subscriber.stateName === currentStateName.value));

  // current subscriber
  const subscriber = computed(() => {
    const subscriberIndex = subscribers.value.findIndex((subscriber) => subscriber.id === id);
    return subscribers.value[subscriberIndex];
  });

  // for manual use
  const checkChanges = computed(() => state.value?.isStateChanged);

  const initChange = () => {
    if (subscribers.value.length > 0) {
      state.value.isStateChanged = true;
    }
  };

  // check that all subscribers have been executed
  const checkSubComplete = () => {
    if (currentSubscribers.value.every((subscriber) => subscriber.changesComplete)) {
      state.value.isStateChanged = false;
    }
  };

  // wait subs
  const startWatch = (value) => {
    if (stateIndex.value !== -1) {
      return watch(
        value,
        () => {
          if (subscribers.value.length > 0 && !state.value?.isStateChanged) {
            state.value.isStateChanged = true;
          }
        },
        {
          deep: true,
        },
      );
    }
  };

  // do action
  const startChange = () => watch(
    state,
    async (newValue) => {
      if (newValue?.isStateChanged) {
        if (!subscriber.value.immediate) {
          await subscriber.value.action();
        }
        subscriber.value.changesComplete = true;
        checkSubComplete();
        subscriber.value.immediate = false;
      }
    },
    {
      deep: true,
    },
  );

  const setState = ({stateName, value}) => {
    const newState = {
      stateName,
      isStateChanged: false,
    };
    isCreator.value = true;
    states.value.push(newState);
    currentStateName.value = stateName;
    startWatch(value);
  };

  const setSubscriber = ({
    stateName = '',
    actionProp = () => {},
    immediate = false,
    argument,
  } = {}) => {
    const newSubscriber = {
      stateName,
      async action() {
        await actionProp(argument);
      },
      id,
      changesComplete: false,
      immediate,
    };
    currentStateName.value = stateName;
    subscribers.value.push(newSubscriber);
    startChange();
  };

  onUnmounted(() => {
    const subscriberIndex = subscribers.value.findIndex((subscriber) => subscriber.id === id);
    if (subscriberIndex !== -1) {
      subscribers.value.splice(subscriberIndex, 1);
    }
    if (isCreator.value) {
      states.value.splice(stateIndex.value, 1);
    }
  });

  return {
    setState,
    setSubscriber,
    checkChanges,
    initChange,
  };
};
