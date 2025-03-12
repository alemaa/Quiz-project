<template>
  <h1>${{ totalPrice }}</h1>

  <div class="report-content">
    <div>
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
          <button class="category-edit" @click="edit(index)">
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
  margin-left: 10px;
  border-bottom: 1px dotted black;
  color: #14365680;
  flex: 1;
}

.info-item__name, .info-item__value {
  flex: 1;
}

.category-icon__background {
  color: rgb(101, 188, 191);
  background-color: rgba(101, 188, 191, 0.1);
  border-radius: 100%;
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

.category-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  padding-left: 10px;
}

.category-icon__name {
  color: #143656;
  opacity: 0.8;
  font-weight: 600;
  font-size: 16px;
  line-height: 21.82px;
}

.category-content {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  border-bottom: 1px solid gray;
}

.category-edit {
  background: transparent;
  border: 0;
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
  margin-top: 5px;
}

.category-icon {
  flex-wrap: wrap;
}

@media (min-width: 480px) {
  .category-edit {
    cursor: pointer;
  }
}
</style>
