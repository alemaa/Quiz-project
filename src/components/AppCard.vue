<template>
  <div class="card-content" :class="{'card-content__fashion' : activeStep === 3}">
    <div
      class="card-content__img"
      :class="{ selected: isSelected }"
      @click="selection"
    >
      <img class="property-image" :src="data?.thumbnail?.filename" />
      <div
        v-if="isSelected"
        class="check"
        :class="{ 'check-icon-fashion': activeStep === 3 }"
        :style="{ '--checkmark-color': checkmarkColor }"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44.207 0.931195C43.361 0.459557 42.4305 0.159624 41.4688 0.0485495C40.507 -0.062525 39.5328 0.017437 38.6019 0.283864C37.671 0.55029 36.8017 0.997956 36.0436 1.60126C35.2855 2.20456 34.6535 2.95166 34.1839 3.79985L20.5016 28.4695L12.671 20.6241C11.9912 19.9189 11.178 19.3564 10.2788 18.9694C9.37963 18.5824 8.41255 18.3787 7.43397 18.3702C6.4554 18.3616 5.48493 18.5485 4.57919 18.9197C3.67345 19.291 2.85059 19.8393 2.1586 20.5326C1.46662 21.2259 0.91938 22.0503 0.548814 22.9578C0.178247 23.8652 -0.00822528 24.8375 0.000278264 25.818C0.00878181 26.7984 0.212091 27.7673 0.598342 28.6682C0.984592 29.5691 1.54605 30.3838 2.24995 31.065L16.9898 45.8328C18.3827 47.2321 20.2621 48 22.2004 48L23.2211 47.9262C24.3507 47.7678 25.4283 47.349 26.3689 46.7026C27.3095 46.0562 28.0875 45.1998 28.6417 44.201L47.0665 10.9733C47.5369 10.1258 47.8361 9.19383 47.947 8.2305C48.0578 7.26716 47.9782 6.29139 47.7127 5.35888C47.4472 4.42637 47.0009 3.5554 46.3994 2.79569C45.7979 2.03599 45.0529 1.40243 44.207 0.931195V0.931195Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div class="card-content__location" v-if="data?.options?.info?.exists">
        <img class="cars-image" :src="data?.options.info?.icon?.filename" />
        <p>{{ data?.options.info?.text }}</p>
      </div>
    </div>
    <div
      class="card-content__description"
      :class="{ 'card-description__fashion': activeStep === 3 }"
    >
      <div class="card-content__left-side">
        <h1 class="card-content__title">
          {{ data?.name }}
        </h1>
        <div class="card-content__avatar" v-if="data?.options?.agent.exists">
          <img
            :src="data?.options?.agent?.avatar?.filename"
            alt="avatar icon"
          />
          <p>{{ data?.options?.agent?.name }}</p>
        </div>

        <div class="card-content__model" v-else>
          <p>{{ data?.description }}</p>
        </div>

        <div class="card-content__review" v-if="data?.options?.rating?.exists">
          <div class="stars">
            <div
              v-for="index in 5"
              :key="index"
              :class="{
                'card-content__star': index <= data?.options?.rating?.value,
              }"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.04894 0.927049C4.3483 0.0057385 5.6517 0.00573921 5.95106 0.92705L6.34708 2.1459C6.48096 2.55792 6.86491 2.83688 7.29814 2.83688H8.57971C9.54844 2.83688 9.95121 4.0765 9.1675 4.6459L8.13068 5.39919C7.7802 5.65383 7.63354 6.1052 7.76741 6.51722L8.16344 7.73607C8.46279 8.65738 7.40831 9.4235 6.6246 8.8541L5.58778 8.10081C5.2373 7.84617 4.7627 7.84617 4.41221 8.10081L3.3754 8.8541C2.59169 9.4235 1.53721 8.65738 1.83656 7.73607L2.23259 6.51722C2.36646 6.1052 2.2198 5.65383 1.86932 5.39919L0.832501 4.6459C0.0487874 4.0765 0.451563 2.83688 1.42029 2.83688H2.70186C3.13509 2.83688 3.51904 2.55792 3.65292 2.1459L4.04894 0.927049Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <p>{{ data?.options?.rating?.review_amount }} <span>reviews</span></p>
        </div>
        <div class="card-content__meta" v-else-if="data?.options?.meta?.items">
          <div v-for="(item, key) in data?.options?.meta.items" :key="key">
            <p>{{ item }}</p>
          </div>
        </div>
      </div>

      <div class="right-side">
        <div class="card-content__price">
          <strong>
            <p v-if="activeStep === 1">
              ${{ data?.options?.price?.weekly_value }}<span> per week</span>
            </p>
            <p v-else-if="activeStep === 2">
              ${{ data?.options?.price?.value }}
            </p>
            <p v-if="activeStep === 3" class="price-fashion">
              ${{ data?.price }}
            </p>
          </strong>
          <div
            class="card-content__tooltip"
            v-if="data?.options?.tooltip?.exists"
          >
            <img @click="show" src="/images/icon-tooltip.svg" alt="info icon" />
          </div>
        </div>
      </div>

      <div class="tooltip__open" v-if="isOpen">
        <div>
          <hr />
        </div>
        <div
          class="tooltip__item"
          v-for="(item, key) in data?.options.tooltip.data"
          :key="key"
        >
          <span class="tooltip__name">{{ item.name }} </span>
          <strong>
            <span class="tooltip_value">$ {{ item.value }}</span>
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const activeStep = computed(() => store.getters.activeStep);

const isSelected = computed(
  () => store.state.currentSelectedItem?.id === props.data?.id
);

const selection = () => {
  if (store.state.currentSelectedItem?.id === props.data?.id) {
    store.state.currentSelectedItem = null;
  } else {
    store.state.currentSelectedItem = props.data;
  }
  console.log(store.state.currentSelectedItem, "current");
};

const isOpen = ref(false);

const show = () => {
  isOpen.value = !isOpen.value;
};

const genderValue = computed(() => store.getters.genderValue);

const checkmarkColor = computed(() => {
  if (activeStep.value - 1 === props?.data?.category_id) {
    return props?.data?.category_id === 1 ? "#0695D3" : "#BE1E2D";
  } else if (activeStep.value === 3) {
    if (genderValue.value === "male") {
      return "#C5E6F9";
    } else {
      return "#F5DDFDB0";
    }
  }
  return "#BE1E2D";
});

interface toolTipData {
  name: string;
  value: number;
}

const props = defineProps({
  data: Object as PropType<AppCard>,
  selected: {
    type: Boolean,
    default: false,
  },
});

interface AppCard {
  price: number;
  id: string;
  name: string;
  description: string;
  category_id: number;
  thumbnail: {
    dir: string;
    filename: string;
  };
  options: {
    agent: {
      exists: boolean;
      name: string;
      avatar: {
        dir: string;
        filename: string;
      };
    };
    rating: {
      exists: boolean;
      value: number;
      review_amount: number;
    };
    tooltip: {
      exists: boolean;
      data: toolTipData[];
    };
    info: {
      exists: boolean;
      text: string;
      icon: {
        dir: string;
        filename: string;
      };
    };
    meta: {
      exists: boolean;
      items: string[];
    };
    price: {
      exists: boolean;
      value: number;
      weekly_value: number;
    };
  };
}
</script>

<style>
:root {
  --checkmark-color: #be1e2d;
}

.card-content {
  margin-bottom: 20px;
}

.card-content__fashion {
  padding: 10px;
}

.tooltip__open {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
}

.tooltip__item {
  display: flex;
  justify-content: space-between;
}

.card-content__star {
  color: red;
}

.cars-image,
.property-image {
  border-radius: 20px;
  object-fit: cover;
  width: 100%;
  height: auto;
}

.check-icon {
  width: 50px;
}

.check {
  color:white;
}

.check svg {
  width: 50px;
  height: 50px;
}

.check-icon-fashion {
  color: #756b6b;
}

.card-content__img {
  display: flex;
  flex-direction: column;
  position: relative;
}

.card-content__location {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: #ffffff;
  opacity: 66%;
  font-size: 11px;
  width: 94px;
  height: 26px;
  margin-left: 25px;
  margin-top: 30px;
  color: #143656;
  position: absolute;
}

.card-content__location img {
  width: 10px;
  height: 13px;
}

.card-content__description {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: white;
  border: 2px solid white;
  border-radius: 20px;
  text-align: start;
  color: #143656;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding: 10px;
  margin-top: -30px;
}

.card-description__fashion {
  margin-top: 0;
}

.right-side {
  display: flex;
  align-items: center;
}

.card-content__title {
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 27.28px;
  letter-spacing: -0.3px;
  margin: 0;
}

.card-content__avatar {
  display: flex;
  gap: 5px;
  font-family: "Rubik", serif;
  font-weight: 300;
  font-size: 11px;
  line-height: 13.04px;
  letter-spacing: -0.3px;
  align-items: center;
}

.card-content__tooltip {
  display: flex;
  justify-content: flex-end;
}

.card-content__model {
  margin-top: -10px;
}

.card-content__avatar img {
  width: 18px;
  height: 18px;
  object-fit: cover;
}

.card-content__price span {
  font-size: 12px;
  font-weight: 500;
  line-height: 14.22px;
  letter-spacing: -0.3px;
}

.card-content__review {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 9px;
  font-weight: 300;
  line-height: 10.67px;
  letter-spacing: -0.3px;
  color: #000000;
  opacity: 20%;
}

.stars {
  display: flex;
}

.card-content__meta {
  display: flex;
  font-size: 9px;
  gap: 10px;
  line-height: 10.67px;
  letter-spacing: -0.3px;
  width: 222px;
  margin-top: -20px;
}

.check {
  background-color: var(--checkmark-color);
  width: 85px;
  height: 85px;
  border-radius: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content__img.selected::before {
  content: "";
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  position: absolute;
}

.price-fashion {
  display: flex;
}
@media (min-width: 480px) {
  .card-content {
    display: flex;
    flex-direction: column;
  }

  .card-content__description {
    min-width: 50%;
    position: relative;
  }
}
</style>
