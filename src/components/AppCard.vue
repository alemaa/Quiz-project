<template>
    <div class=card-content>
        <div class="card-content__image">
       <img :src=bgImage>
        </div>
        <div class="card-content__location">
            <img src="/images/icon-location.svg" alt="location icon">
            <p>Outer city</p>
        </div>
        <h2 class="card-content__title">{{title}}</h2>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    bgImage:{type:Image, required:true},
    title: {type:String, required:true},
    avatar: {type:Image},
    review:{type:String},
    price: {type:String},
    info: {typeof:Image}
})

</script>

<style>

.card-content__location {
    display:flex;
    gap:5px;
    border-radius:50px;
    background-color:#FFFFFF;
    opacity:66%;
    max-width:35%;
}

@media(min-width:480px){
}
</style>