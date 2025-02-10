<template>
    <div v-if="activeStep===0">
        <AppCard  bgImage="/images/property_starter.jpg"
       title="Starter">
        </AppCard>
    </div>
</template>

<script setup>
import AppCard from './AppCard.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const activeStep = computed(() => store.getters.activeStep);

</script>

<style>

</style>