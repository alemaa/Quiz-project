<template>
  <div
    class="cards"
    :class="{ 'cards-fashion':activeStep === 3 && !displayGenderScreen }"
  >
    <AppCard v-for="(item, index) in data" :key="index" :data="item" />
    <div class="total-cost" v-if="activeStep===3&& !displayGenderScreen">
      <p>Total Cost:</p> {{ totalPrice }}
    </div>
  </div>
</template>

<script setup>
import store from "@/store";
import AppCard from "./AppCard.vue";
import { onMounted, defineProps, watch, computed } from "vue";

const activeStep = computed(() => store.getters.activeStep);
const displayGenderScreen = computed(() => store.getters.displayGenderScreen);
// const selectedItems = computed(() => store.getters.selectedItems);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

//  const totalPrice = computed(()=> {
//   const category= selectedItems.value.find(el=>el.id===3);
//    return category?.price || 0;
//  });

onMounted(() => {
  console.log(props.data, "screen");
});

watch(
  () => props.data,
  () => {
    console.log(props.data, "screen watcher");
  },
  { immediate: true }
);
</script>

<style>
.cards-fashion {
  background-color: white;
  padding-top: 50px;
  border-radius: 20px;
}

.total-cost {
  border-top: 1px solid black;
  text-align: start;
  padding-bottom: 20px;
  margin: 20px;
}

@media (min-width: 480px) {
  .cards {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .cards-fashion {
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
