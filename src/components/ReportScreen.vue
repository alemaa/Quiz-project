<template>
  <h1>${{ totalPrice }}</h1>

  <div class="report-content">
    <div>
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="report-categories"
        :class="{ border: isOpen[index] }"
      >
        <div class="categories-icon">
          <div class="categories-icon__background">
            <img :src="category?.icon" alt="categories icon" />
          </div>
          <p class="categories-name">{{ category.name }}</p>
          <button class="categories-edit" @click="edit(index)">
            <img :src="category?.iconEdit" alt="icon edit" />
          </button>
        </div>
        <div class="price-details">
          <strong
            ><p>
              ${{
                selectedItems[index]?.options?.price?.weekly_value ||
                selectedItems[index]?.options?.price?.value ||
                fashionPrice(selectedItems[index]?.data)
              }}
            </p></strong
          >
          <img
            src="/images/details_icon.svg"
            @click="show(index)"
            class="show-details"
            alt="details icon"
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
import { computed, defineProps, ref} from "vue";
import { useStore } from "vuex";

defineProps({
  categories: {
    type: Object,
    required: true,
  }
});

const store = useStore();
const selectedItems = computed(() => store.getters.selectedItems);
const isOpen = ref([]);

const show = (index) => {
  isOpen.value[index] = !isOpen.value[index];
};

const fashionPrice = (data) => {
  return data?.reduce((sum, item)=> sum + (item.price||0),0);
};

const totalPrice = computed(() => {
  return selectedItems.value
    .reduce((sum, item) => {
      const price =
        item?.options?.price?.weekly_value ||
        item?.options?.price?.value ||
        fashionPrice(item.data) ||
        0;
      return sum + price;
    }, 0)
    .toFixed(2);
});

const edit = (index) => {
  store.commit("SET_ACTIVE_STEP", index + 1);
};
</script>

<style>
.report-content {
  border-radius: 15px;
  min-height: 514px;
  background-color: white;
}

.separator {
  margin:0 10px;
  border-bottom: 1px dotted black;
  color: #14365680;
  flex: 1;
}

.info-item__name {
  text-align: start;
}

.info-item__value  {
  text-align: end;
}

.categories-icon__background {
  color: rgb(101, 188, 191);
  background-color: rgba(101, 188, 191, 0.1);
  border-radius: 100%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: 20px;
  line-height: 100%;
  letter-spacing: -0.3px;
}

.categories-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  padding-left: 10px;
  flex-wrap: wrap;
}

.categories-name {
  color: #143656;
  opacity: 0.8;
  font-weight: 600;
  font-size: 16px;
  line-height: 21.82px;
}

.report-categories {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  border-bottom: 1px solid gray;
}

.categories-edit {
  background: transparent;
  border: 0;
  cursor: pointer;
}

.border {
  border-bottom: none;
}

.info-open {
  width: 100%;
  margin-top: -30px;
  border-top: 1px solid gray;
  padding: 0 50px;
}

.info-item {
  display: flex;
  color: #143656;
  font-size: 11px;
  font-weight: 400;
  line-height: 15px;
  align-items: center;
  margin-top: 5px;
}

@media (min-width: 480px) {
  .categories-edit {
    cursor: pointer;
  }
}
</style>
