<template>
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
</head>

<div class="welcome-content">
<main>
  <img :src="nesto">
  <div v-if="activeStep === -1">
    {{ description }}
  </div>
  <template v-for="item in screens">
    <KomponentaSa3kartice v-if="activeStep === item.id"  data="item.data" />
  </template>
  <div>
    <button>
      {{ text }}
    </button>
  </div>
</main>
</div>

</template>

<script setup>
import {ref} from "vue"
const nesto = ref('slika sa home')
const text = ref('start')

const description=ref(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`)



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
  0nsad
}

.welcome-content {
  max-width: 1050px;
  padding: 0 20px;
  margin: 0 auto;
}

.welcome-content__header {
margin-top: -30px;
}

.welcome-content__description {
  margin-top: 60px;
  font-family: 'Nunito';
}

.footer-content {
  margin-top: 140%;
}
.footer-content__button {
  border: 1px solid black;
 background-color: black;
 width: 414px;
 height: 70px;
 border-radius: 20px;
}
@media(min-width:480px){

}
</style>
