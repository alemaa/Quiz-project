<template>
    <div >
        <AppCard  v-for="(item,index) in screen.data" :key="index"
           :data="item"
            :selected="isSelected(item)"
            @selection="selection(item)"
            @show="openDetails"
           />
    </div>
</template>
<script setup>
import AppCard from './AppCard.vue';
import { onMounted,computed,defineProps } from 'vue';
import { useStore } from 'vuex';

const store=useStore();

const props = defineProps({
  screen: {
    type: Object,
    required: true
  },
})
const activeStep = computed(()=> store.getters.activeStep);
const selectedProperty = computed (() => store.getters.selectedProperty);
const selectedCar = computed (() => store.getters.selectedCar);

const isSelected = (item) => {
  const selected = activeStep.value === 1 ? selectedProperty : selectedCar;
  return item.id === selected?.id;
};

const selection =(item) => {
  if(activeStep.value === 1) {
  store.dispatch('SET_SELECTED_PROPERTY',selectedProperty.value?.id === item.id ? null : item);
  }
  else if(activeStep.value === 2) {
    store.dispatch('SET_SELECTED_CAR',selectedCar.value?.id === item.id ? null : item);
  }
}

onMounted(()=>{
  console.log(props.screen, 'screen')
})
</script>

<style>

</style>