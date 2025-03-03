<template>
  <h1 class="report-total-price">${{ totalPrice }}</h1>

  <div class="report-content">
    <div class="report-categories">
      <div v-for="(category, index) in categories" :key="index" class="category-content">
        <div class="category-icon">
          <img :src="category?.icon" alt="icon" />
          <p>{{ category.name }}</p>
          <img :src="category?.iconEdit" alt="icon edit" />
        </div>
        <div class="price-details">
          <strong
            ><p>
              {{
                selectedItems[index]?.options?.price?.weekly_value ||
                selectedItems[index]?.options?.price?.value ||
                selectedItems[index]?.price
              }}
            </p></strong
          >
          <img src="/images/details_icon.svg" @click="show" />
        </div>
        <div class="info-open" v-if="isOpen">
          <div
            class="tooltip__item"
            v-for="(item, index) in selectedItems[index]?.options?.tooltip
              ?.data"
            :key="index"
          >
            <span> {{ item.name }} </span>
            <span>{{ item.value }} </span>
          </div>
        </div>
      </div>
    </div>

    <!-- <div
        class="report-categories"
        v-for="(item, index) in selectedItems"
        :key="index"
      >
      {{ item?.options?.price?.weekly_value ||
         item?.options?.price?.value || item?.price }} -->

    <!-- <div class="info-open" v-if="isOpen">
        <div class="info-item" v-for="(item, key) in toolTipData" :key="key">
          <span class="info__name">{{ item.name }}</span>
          <span class="info_value">$ {{ item.value }}</span>
        </div>
      </div> -->
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const selectedItems = computed(() => store.getters.selectedItems);

defineProps({
  categories: {
    type: Object,
    required: true,
  },
});

const show = () => {
  isOpen.value = !isOpen.value;
};

const isOpen = ref(false);

// const toolTipData = computed(() => {
//   const info = selectedItems.value.find((item) => item.category_id === 0);
//   return info?.options?.tooltip?.data || 0;
// });

// const infoCar = computed(() => {
//   const infoCar = selectedItems.value.find((item) => item.category_id === 0);
//   return infoCar?.options?.tooltip?.data || 0;
// });

//const toolTipData = ref([{ info: infoProperty }, { info: infoCar }]);

// const propertyPrice = computed(() => {
//   const property = selectedItems.value.find((item) => item.category_id === 0);
//   return property?.options?.price?.weekly_value || 0;
// });

// console.log(propertyPrice,'price')
// console.log(propertyPrice.value,'property price')

// const carPrice = computed(() => {
//   const car = selectedItems.value.find((item) => item.category_id === 1);
//   return car?.options?.price?.value || 0;
// });

// const fashionPrice = computed(() => {
//   const fashion = selectedItems.value.find((item) => item.category_id === 2);
//   return fashion?.price || 0;
// });

// const report = ref([
//   { price: propertyPrice, image: "/images/details_icon.svg" },
//   { price: carPrice, image: "/images/details_icon.svg" },
//   { price: fashionPrice, image: "/images/details_icon.svg" },
// ]);

// const totalPrice = computed(() => {
//   return parseFloat(propertyPrice.value + carPrice.value).toFixed(2) || 0;
// });
</script>

<style>
.report-content {
  display: flex;
  border-radius: 10px;
}

.price-details {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  flex: 1;
}

.category-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.tooltip__item {
  display: flex;
  justify-content: space-between;
}

.category-content {
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.info-open {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
}

.info-item {
  display: flex;
  justify-content: space-between;
}
</style>
