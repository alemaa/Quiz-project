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
import AppCard from './AppCard.vue';
import { onMounted,computed } from 'vue';
import { defineProps } from 'vue';
import { useStore } from 'vuex';

const store=useStore();

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