<template>
  <div class="card-content">
    <div class="card-content__image">
      <img :src=data?.thumbnail?.filename>

      <div class="card-content__location">
        <img :src=data?.options.info?.icon?.filename>
        <p>{{ data?.options.info?.text }}</p>
      </div>

      <div class="card-content__description">
        <div class="card-content__part1">
          <h1 class="card-content__title">
            {{ data?.name }}
          </h1>

          <div class="card-content__avatar">
            <img :src="data?.options?.agent?.avatar?.filename">
            <p>{{ data?.options?.agent?.name }}</p>
          </div>

          <div class="card-content__review">
            <p>{{ data?.options?.rating?.review_amount }} <span>reviews</span></p>
          </div>
        </div>
        <div class="card-content__price">
          <strong>
            <p>${{ data?.options?.price?.weekly_value }}<span> per week</span>
          </p>
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';

interface tooltipData {
  name:string,
  value:string
}

interface AppCard {
  id: string,
  name: string,
  description: string,
  category_id: number,
  thumbnail:{
      dir: string,
      filename: string
  },
  options: {
    agent: {
      exists:boolean,
      name:string,
      avatar: {
        dir:string,
        filename:string
      }
    }
    rating: {
      exists:boolean,
      value:number,
      review_amount:number
    },
    tooltip: {
      exists:boolean,
      data:tooltipData[]
    },
    info: {
      exists:boolean,
      text:string,
      icon: {
        dir:string,
        filename:string
      }
    },
    meta: {
      exists:boolean,
      items:any[]
    },
    price: {
      exists:boolean,
      value:number,
      weekly_value:number
    }
  }
}

defineProps({
    bgImage: {
      type: String
    },
    data: Object as PropType<AppCard>
})
</script>

<style>
.card-content {
  margin-bottom: 28%;
  position: relative;
}

.card-content__image {
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  object-fit: cover;
}

.card-content__image img {
  border-radius: 20px;
}

.card-content__location {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: #ffffff;
  opacity: 66%;;
  font-size: 11px;
  width: 94px;
  height: 26px;
  position: absolute;
  margin-left: 25px;
  margin-top: 30px;
  color:#143656;
}

.card-content__location img {
  width: 10px;
  height: 13px;
}

.card-content__description {
  display: flex;
  min-width: 100%;
  background-color: white;
  border: 2px solid white;
  border-radius: 20px;
  text-align: start;
  color: #143656;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: -22%;
}

.card-content__part1 {
  flex-basis: 50%;
  padding-left: 20px;
}

.card-content__title {
  font-family: 'Nunito',sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 27.28px;
  letter-spacing: -0.3px;
  margin-bottom: 0;
}

.card-content__avatar {
  display: flex;
  gap:5px;
  font-family: 'Rubik',serif;
  font-weight: 300;
  font-size: 11px;
  line-height: 13.04px;
  letter-spacing: -0.3px;
  align-items: center;
}

.card-content__avatar img {
  width: 18px;
  height: 18px;
  object-fit: cover;
}

.card-content__price {
  flex-basis: 50%;
  align-content: center;
  text-align: end;
  padding-right: 20px;
}

.card-content__price span {
  font-size: 12px;
  font-weight: 500;
  line-height: 14.22px;
  letter-spacing: -0.3px;
}

.card-content__review {
  font-size: 9px;
  font-weight: 300;
  line-height: 10.67px;
  letter-spacing: -0.3px;
  color: #000000;
  opacity: 20%;
}

@media (min-width: 480px) {
}
</style>
