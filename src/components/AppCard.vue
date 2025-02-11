<template>
  <div class="card-content">
    <div class="card-content__image">
      <img :src=data.thumbnail.filename />

      <div class="card-content__location">
        <img :src=bgImage />
      </div>

      <div class="card-content__description">
        <div class="card-content__part1">
          <h2 class="card-content__title">
            {{ data.name }}
          </h2>

          <div class="card-content__avatar">
            <img :src="data.options.agent.avatar.filename" />
            <p>{{ data.options.agent.name }}</p>
          </div>

          <div class="card-content__review">
            <p>{{ data.rating.value }}  {{ data.rating.review_amount }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';

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
  },
    rating: {
      exists:boolean,
      value:number,
      review_amount:number
    },
    tooltip: {
      exists:boolean,
    
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
      
    },
    price: {
      exists:boolean,
      value:number,
      weekly_value:number
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
  position: fixed;
}

.card-content__location {
  display: flex;
  gap: 5px;
  border-radius: 50px;
  background-color: #ffffff;
  opacity: 66%;
  position: absolute;
  top: 20px;
  left: 5%;
}

.card-content__title {
  text-align: start;
  margin-left: 5%;
}

.card-content__avatar {
  display: flex;
  gap: 10px;
  margin-left: 5%;
}

.card-content__image {
  min-width: 100%;
  display: flex;
  flex-direction: column;
}

.card-content__image img {
  border-radius: 20px;
}

.card-content__review {
  text-align: start;
  margin-left: 5%;
}

.card-content__part1 {
  flex-basis: 50%;
}

.card-content__description {
  display: flex;
  background-color: white;
  border: 2px solid white;
  border-radius: 20px;
  margin-top: -30px;
}

.card-content__price {
  flex-basis: 50%;
  align-content: center;
}

@media (min-width: 480px) {
}
</style>
