<template>
    <div class="cards" :class="{'cards-fashion' :activeStep===3}">
        <AppCard  v-for ="(item,index) in data" :key="index"
           :data="item"
        />
    </div>
</template>
<script setup>

import store from '@/store';
import AppCard from './AppCard.vue';
import { onMounted,defineProps, watch, computed } from 'vue';

const activeStep = computed (() =>store.getters.activeStep);

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

onMounted(()=>{
  console.log(props.data, 'screen')
})

watch(()=>props.data, () => {
  console.log(props.data, 'screen watcher')
}, { immediate: true })
</script>

<style>
.cards-fashion {
  background-color: white;
  padding-top: 50px;
  border-radius: 20px;
}

@media (min-width: 480px) {
  .cards {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
  }
}
</style>