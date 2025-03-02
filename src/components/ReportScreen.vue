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
                    <p>${{propertyPrice}}</p>
                </strong>
                <img src="/images/details_icon.svg">
            </div>
            <div class="report-price__car">
                <strong>
                    <p>${{carPrice}}</p>
                </strong>
                <img src="/images/details_icon.svg">
            </div>

            <div class="report-price__car">
                <strong>
                    <p>${{fashionPrice}}</p>
                </strong>
                <img src="/images/details_icon.svg" >
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();

const activeStep = computed (() => store.getters.activeStep);

defineProps({
  categories: {
    type: Object,
    required: true
  }
});

const editProperty =()=>{
  store.commit('SET_ACTIVE_STEP', activeStep.value - 3)
}

const editCar =() =>{
  store.commit('SET_ACTIVE_STEP',activeStep.value - 2)
}
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