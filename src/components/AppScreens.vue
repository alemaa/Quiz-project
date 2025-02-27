<template>
    <div class="cards">
        <AppCard  v-for ="(item,index) in data" :key="index"
           :data="item"
            :selected="selectedItems===item.id"
            @show="openDetails"
           />
    </div>
</template>
<script setup>

import AppCard from './AppCard.vue';
import { onMounted,defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  fashionData: {
    type:Array,
  }
})

onMounted(()=>{
  console.log(props.screen, 'screen')
})
</script>

<style>
@media (min-width: 480px) {
  .cards {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
  }
}
</style>