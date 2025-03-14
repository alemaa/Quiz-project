<template>
  <div
    class="card-content"
    :class="{
      'card-content__fashion': activeStep === stepId.FASHION,
      selected: isSelected,
    }"
    @click="selection"
  >
    <div
      class="card-content__img"
      :class="{ selected: isSelected, 'selected-fashion':activeStep === stepId.FASHION }"
    >
      <img class="card-content__image" :src="data?.thumbnail?.filename" alt="card image" />
      <div
        v-if="isSelected"
        class="card-content__check"
        :class="{ 'check-icon__fashion': activeStep === stepId.FASHION }"
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
        <img :src="data?.options.info?.icon?.filename" alt="location icon" />
        <p>{{ data?.options.info?.text }}</p>
      </div>
    </div>
    <div
      class="card-content__description"
      :class="{ 'card-description__fashion': activeStep === stepId.FASHION }"
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
            <li>{{ item }}</li>
          </div>
        </div>
      </div>

      <div class="card-content__right-side">
        <div class="card-content__price">
          <strong>
            <p v-if="activeStep === stepId.PROPERTY">
              ${{ data?.options?.price?.weekly_value }}<span> per week</span>
            </p>
            <p v-else-if="activeStep === stepId.CARS">
              ${{ data?.options?.price?.value }}
            </p>
            <p v-if="activeStep === stepId.FASHION">
              ${{ data?.price }}
            </p>
          </strong>
          <button
            class="card-content__tooltip"
            @click.stop.prevent="show"
            v-if="data?.options?.tooltip?.exists"
          >
            <img src="/images/icon-tooltip.svg" alt="info icon" />
          </button>
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
            <span class="tooltip__value">$ {{ item.value }}</span>
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref } from "vue";
import { useStore } from "vuex";
import dataApp from "@/assets/data.json";

interface toolTipData {
  name: string;
  value: number;
}

const props = defineProps({
  data: Object as PropType<AppCard>,
  totalPrice:Number
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

const store = useStore();
const activeStep = computed(() => store.getters.activeStep);
const stepId = computed(() => store.getters.stepId);
const genderValue = computed(() => store.getters.genderValue);
const currentSelectedItem = computed(() => store.getters.currentSelectedItem);
const selectedItems = computed(() =>store.getters.selectedItems);

const fashionData = computed(() => {
  const categoryGender = dataApp?.screens?.fashion[genderValue.value];
  return categoryGender?.find((el) =>
    el.data.find((item) => item.id === props.data?.id)
  );
});

const isSelected = computed(() => {
 return currentSelectedItem.value?.id === (activeStep.value === stepId.value.FASHION ? fashionData?.value.id  : props.data?.id) ||
 !currentSelectedItem.value?.id && selectedItems.value[activeStep.value -1]?.id === props.data?.id
});

const selection = () => {
  if(activeStep.value === stepId.value.FASHION) {
    store.dispatch("UPDATE_CURRENT_SELECTED_ITEM", currentSelectedItem.value?.id === fashionData?.value.id ? null : fashionData?.value)
  }
  else {
     store.dispatch("UPDATE_CURRENT_SELECTED_ITEM", currentSelectedItem.value?.id === props.data?.id  && selectedItems.value[activeStep.value-1]?.id !== props.data?.id ? null : props.data)
  }
}

const isOpen = ref(false);

const show = () => {
  isOpen.value = !isOpen.value;
};

const checkmarkColor = computed(() => {
  if (activeStep.value - 1 === props?.data?.category_id) {
    return props?.data?.category_id === 1 ? "#0695D3" : "#BE1E2D";
  }
  return "#BE1E2D";
});
</script>

<style>
:root {
  --checkmark-color: #be1e2d;
}

.card-content {
  margin-bottom: 20px;
  position: relative;
  z-index: 0;
}

.card-content__fashion {
  padding: 0 10px 0 10px;
}

.card-content__star {
  color: red;
}

.card-content__image {
  border-radius: 20px;
}

.card-content__check svg {
  width: 50px;
  height: 50px;
}

.card-content__img {
  display: flex;
  flex-direction: column;
  position: relative;
}

.card-content__location {
  display: flex;
  gap: 5px;
  border-radius: 50px;
  background-color: #ffffff;
  opacity: 66%;
  font-size: 11px;
  font-family: "Rubik";
  font-weight: 300;
  line-height: 100%;
  letter-spacing: -0.3px;
  margin-left: 25px;
  margin-top: 30px;
  color: #143656;
  position: absolute;
  padding: 0 10px;
  max-height: 25px;
  align-items: center;
}

.card-content__description {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: white;
  border-radius: 20px;
  text-align: start;
  color: #143656;
  position: relative;
  z-index: 1;
  margin-top: -30px;
  padding: 0 15px 15px 15px;
}

.card-description__fashion {
  margin-top: 0;
}

.card-content__right-side {
  display: flex;
  align-items: center;
}

.card-content__title {
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 27.28px;
  letter-spacing: -0.3px;
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
  margin-top: -15px;
}

.card-content__avatar img {
  width: 18px;
  height: 18px;
  object-fit: cover;
}

.card-content__tooltip {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  position: relative;
  background: transparent;
  border: 0;
  margin-left: auto;
}

.tooltip__open {
  width: 100%;
}

.tooltip__item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.card-content__model {
  font-family: "Rubik";
  font-size: 11px;
  font-weight: 300;
  line-height: 100%;
  letter-spacing: -0.3px;
  margin-top: -10px;
}

.card-content__price {
  font-size: 20px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.3px;
}

.card-content__price span {
  font-size: 12px;
}

.card-content__review {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 9px;
  font-weight: 300;
  line-height: 10.67px;
  letter-spacing: -0.3px;
  color: rgb(0, 0, 0, 20%);
}

.stars {
  display: flex;
}

.card-content__meta {
  display: flex;
  font-size: 9px;
  gap: 7px;
  line-height: 10.67px;
  letter-spacing: -0.3px;
  flex-wrap: wrap;
}

.card-content__check {
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
  color: white;
}

.card-content__img::before {
  content: "";
  inset: 0;
  opacity: 0;
  background-color: black;
  border-radius: 20px;
  transition: opacity 500ms ease;
  position: absolute;
}

.card-content__img.selected::before {
  opacity: 0.5;
}

.selected-fashion::before,
.check-icon__fashion {
  visibility: hidden;
}

@media (min-width: 480px) {
  .card-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    cursor: pointer;
  }
}
</style>
