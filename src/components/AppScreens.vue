<template>
    <div >
        <AppCard  v-for="(item,index) in data.screens" :key="index"
           :data="item.data"
           />
    </div>
</template>

<script setup>
 import AppCard from './AppCard.vue';
import { onMounted} from 'vue';
import data from '@/assets/data.json';


onMounted(()=>{
  console.log(data);
})
</script>

<style>

</style>