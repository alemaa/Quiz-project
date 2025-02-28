<template>
    <h1 class="report-total-price">${{totalPrice}}
    </h1>
    <div class="report-content">
        <div class="report-details">
            <div class="report-categories" v-for="(category,index) in categories" :key="index">
                <img :src="category?.icon">
                <p> {{ category?.name }}</p>
                <div  v-if="category?.id===1">
                  <img @click="editProperty" src="/images/edit_icon.svg">
                </div>
                <div v-else>
                  <img @click="editCar" src="/images/edit_icon.svg">
                </div>
            </div>
        </div>
        <div class="report-price">
            <div class="report-price__property">
                <strong>
                    <p v-if="selectedItems">${{selectedItems?.options?.price?.weekly_value }}</p>
                </strong>
                <img src="/images/details_icon.svg">
            </div>
            <div class="report-price__car">
                <strong>
                    <p v-if="selectedItems">${{selectedItems?.options?.price?.value }}</p>
                </strong>
                <img src="/images/details_icon.svg">
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "vuex";

const editProperty =()=>{
  store.commit('SET_ACTIVE_STEP',1)
}

const editCar =() =>{
  store.commit('SET_ACTIVE_STEP',2)
}

defineProps({
  categories: {
    type: Object,
    required: true
  }
});

const store = useStore();
const selectedItems=computed(()=>store.getters.selectedItems);
const totalPrice = computed(() => {
  return (selectedItems?.value.options?.price?.weekly_value || 0);
});
</script>

<style>
.report-content {
  display: flex;
}

.report-total-price {
  margin-top: -50px;
}

.report-details {
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
}

.report-categories {
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
}

.report-price {
  flex-basis: 50%;
}

.report-price__property, .report-price__car {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  gap: 10px;
}
</style>