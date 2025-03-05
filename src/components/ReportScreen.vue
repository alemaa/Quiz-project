<template>
  <h1 class="report-total-price">${{ totalPrice }}</h1>

  <div class="report-content">
    <div class="report-categories">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="category-content"
        :class="{ border: isOpen[index] }"
      >
        <div class="category-icon">
          <div class="category-icon__background">
            <img :src="category?.icon" alt="icon" />
          </div>
          <p class="category-icon__name">{{ category.name }}</p>
          <img :src="category?.iconEdit" alt="icon edit" @click="edit" />
        </div>
        <div class="price-details">
          <strong
            ><p>
              ${{
                selectedItems[index]?.options?.price?.weekly_value ||
                selectedItems[index]?.options?.price?.value ||
                selectedItems[index]?.price
              }}
            </p></strong
          >
          <img
            src="/images/details_icon.svg"
            @click="show(index)"
            class="show-details"
          />
        </div>

        <div class="info-open" v-if="isOpen[index]">
          <div
            class="info-item"
            v-for="(item, index) in selectedItems[index]?.options?.tooltip
              ?.data"
            :key="index"
          >
            <span class="info-item__name"> {{ item.name }} </span>
            <span class="separator"></span>
            <span class="info-item__value">${{ item.value }} </span>
          </div>
        </div>
      </div>
    </div>
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

const isOpen = ref([]);

const show = (index) => {
  isOpen.value[index] = !isOpen.value[index];
};

const totalPrice = computed(() => {
  return selectedItems.value
    .reduce((sum, item) => {
      const price =
        item?.options?.price?.weekly_value ||
        item?.options?.price?.value ||
        item?.price ||
        0;
      return sum + price;
    }, 0)
    .toFixed(2);
});

//const activeStep = computed(() => store.getters.activeStep);

const edit = () => {
  store.commit("SET_ACTIVE_STEP",1)
};
</script>

<style>
.report-content {
  border-radius: 10px;
  min-height: 514px;
}

.separator {
  margin-left: 10px;
  border-bottom: 1px dotted black;
  color: #14365680;
  flex: 2;
}

.info-item__name {
  flex: 1;
}

.info-item__value {
  flex: 1;
}

.category-icon__background {
  color: rgb(101, 188, 191);
  background-color: rgba(101, 188, 191, 0.1);
  border-radius: 50px;
}

.show-details {
  cursor: pointer;
}

.price-details {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  flex: 1;
  padding-right: 10px;
}

.category-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  padding-left: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 21.82px;
}

.category-icon__name {
  color: #143656;
  opacity: 0.8;
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
  border-bottom: 1px solid gray;
}

.border {
  border-bottom: none;
}

.info-open {
  width: 100%;
  margin-top: -30px;
  border-top: 1px solid gray;
}

.info-item {
  display: flex;
  color: #143656;
  font-size: 11px;
  font-weight: 400;
  line-height: 15px;
  align-items: center;
}
</style>
