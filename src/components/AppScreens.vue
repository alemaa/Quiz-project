<template>
    <div >
        <AppCard  v-for="(item,index) in screen.data" :key="index"
           :data="item"
            :selected="selectedItems===item.id"
            @show="openDetails"
           />
    </div>
</template>
<script setup>
import store from '@/store';
import AppCard from './AppCard.vue';
import { onMounted,defineProps, computed } from 'vue';

const props = defineProps({
  screen: {
    type: Object,
    required: true
  },
})

const selectedItems = computed(() => store.state.selectedItems);

onMounted(()=>{
  console.log(props.screen, 'screen')
})
</script>

<style>

</style>