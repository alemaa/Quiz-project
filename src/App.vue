<template>
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
</head>

<div class="welcome-content">
<main>
  <img :src="header">
  <div class="welcome-content__description">
    <div v-if="activeStep === -1">
      {{ description }}
    </div>
    <br>
    <div v-if="activeStep === -1">
      {{ descriptionTwo }}
    </div>
  </div>
  <template v-for="(item,index) in screens" :key="index">
    <ComponentWithCards v-if="activeStep === item.id"  data="item.data" />
  </template>
  <div class="welcome-content__button" :class="{ 'welcome-content__button--white' : activeStep >= 0 }">
    <button id="start" @click="startQuiz">
      {{ activeStep === -1 ? text:text}}
    </button>
  </div>
</main>
</div>
</template>

<script setup>
import {computed, ref} from "vue"
import { useStore } from "vuex";
import ComponentWithCards from "./components/ComponentWithCards.vue";

const store = useStore();
const activeStep = computed(() => store.getters.activeStep);

const description = ref(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
  but also the leap into electronic typesetting, remaining essentially unchanged.`)
const descriptionTwo=ref(`It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
  like Aldus PageMaker including versions of Lorem Ipsum.`);

const screens = ref([
  {id:0,image:"/images/real_estate.png", text:"Select Property",color:"#F9EDED",btnColor:"#BE1E2D"},
  {id:1,image:"/images/cars.png", text:"Select Vehicle", color:"#F8FBFF", btnColor:"#107FC4"}
])

const header = computed(() => {
  const currentScreen=screens.value.find(screen=>screen.id === store.state.activeStep);
  return currentScreen ? currentScreen.image:"/images/lorem.png";
});

const text = computed(() => {
  const currentScreen=screens.value.find(screen=>screen.id === store.state.activeStep);
  return currentScreen ? currentScreen.text:"Start Quiz";
});

const bgColor = computed (() => {
  const currentScreen=screens.value.find(screen=>screen.id === activeStep.value);
  return currentScreen ? currentScreen.color:"#ffffff";
});

const updateColor =()=>{
  document.body.style.setProperty('--backgroundColor',bgColor.value);
}

const btnColor = computed (() => {
  const currentScreen=screens.value.find(screen=>screen.id === activeStep.value);
  return currentScreen ? currentScreen.btnColor:"#ffffff";
});
const updateBtnColor =()=>{
  document.getElementById("start").style.setProperty('--btnColor',btnColor.value);
};

const startQuiz =() => {
  if(activeStep.value === -1) {
    store.dispatch('UPDATE_STEP', 0);
  }
  else {
    store.dispatch('UPDATE_STEP', activeStep.value + 1);
  }
  updateColor();
  updateBtnColor();
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

:root {
  --backgroundColor:white;
  --btnColor:white;
}

body {
  background-color: var(--backgroundColor);

}

.welcome-content {
  max-width: 1050px;
  padding: 0 20px;
  margin: 0 auto;
  font-family: 'Nunito';
}

.welcome-content__description {
  margin-top: 50px;
  text-align: start;
}

.welcome-content__button {
  min-width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border: 1px solid black;
  border-radius:20px;
  padding-top:20px;
  padding-bottom: 20px;
}

.welcome-content__button--white {
 background-color: white;
  border:2px solid white;
}

#start {
  min-width: 50%;
  padding-top:10px;
  padding-bottom: 10px;
  border-radius: 10px;
  border: 2px ;
  background-color:var(--btnColor);
}

@media(min-width:480px){

}
</style>
