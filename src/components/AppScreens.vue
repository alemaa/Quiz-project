<template>
  <div
    class="cards"
    :class="{
      'cards-fashion': activeStep === stepId.FASHION && !displayGenderScreen,
      'fashion-item': currentSelectedItemId === id,
    }"
  >
    <div
      v-if="activeStep === stepId.FASHION && !displayGenderScreen &&  currentSelectedItemId === id"
      class="checkmark"
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
    <AppCard v-for="(item, index) in data" :key="index" :data="item" />
    <div
      class="total-cost"
      v-if="activeStep === stepId.FASHION && !displayGenderScreen"
    >
      <p>Total Cost</p>
      <b><p>${{ totalCost }}</p></b>
    </div>
  </div>
</template>

<script setup>
import store from "@/store";
import AppCard from "./AppCard.vue";
import { onMounted, defineProps, computed, watch } from "vue";
import dataApp from "@/assets/data.json";
console.log(dataApp.screens.fashion, "data");
//const selectedItems = computed(() => store.getters.selectedItems);
const activeStep = computed(() => store.getters.activeStep);
const displayGenderScreen = computed(() => store.getters.displayGenderScreen);
const stepId = computed(() => store.getters.stepId);
const genderValue = computed(() => store.getters.genderValue);
const currentSelectedItem = computed(() => store.getters.currentSelectedItem);

watch(currentSelectedItem, () => {
  console.log(currentSelectedItem.value, "current selected");
  console.log(currentSelectedItemId.value, "VALUEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
});

const currentSelectedItemId = computed(
  () =>
    dataApp.screens.fashion[genderValue.value]?.find(
      (item) => item.id === currentSelectedItem.value?.id
    )?.id
);
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const totalCost = computed(() => {
  if (currentSelectedItem?.value) {
    return currentSelectedItem?.value.data
      .filter((item) => item.price)
      .reduce((sum, item) => sum + item.price, 0);
  }
  return 0;
});

onMounted(() => {
  console.log(props.data, "screen");
});
</script>

<style>
.cards-fashion {
  background-color: white;
  padding-top: 50px;
  border-radius: 20px;
  margin-bottom: 20px;
  position: relative;
}

.total-cost {
  border-top: 1px solid black;
  text-align: start;
  padding-bottom: 20px;
  margin: 20px;
  display: flex;
  justify-content: space-between;
}

.cards.cards-fashion.fashion-item::after {
  content: "";
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  position: absolute;
}

.checkmark{
  background-color: black;
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
  z-index: 1;
}

.checkmark svg {
  width: 50px;
  height: 50px;
}
@media (min-width: 480px) {
  .cards {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .cards-fashion {
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
