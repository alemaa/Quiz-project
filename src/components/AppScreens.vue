<template>
    <div >
        <AppCard  v-for="(item,index) in screen.data" :key="index"
           :data="item"
           />
    </div>
</template>

<script setup>
 import AppCard from './AppCard.vue';
import { onMounted} from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  screen: {
    type: Object,
    required: true
  }
})
onMounted(()=>{
  console.log(props.screen, 'screen')
})
</script>

<style>

</style>