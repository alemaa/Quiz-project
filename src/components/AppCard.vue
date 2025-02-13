<template>
  <div class="card-content">
    <div class="card-content__image" :class="{'selected':selected}"
    @click="selection">
      <img :src=data?.thumbnail?.filename>
    <div v-if="isSelected" class="check">
      <img src="/svg/icons/icon-checkmark.svg">
    </div>

      <div class="card-content__location" v-if="data?.options?.info?.exists">
        <img :src=data?.options.info?.icon?.filename>
        <p>{{ data?.options.info?.text }}</p>
      </div>

      <div class="card-content__description">
        <div class="card-content__part1">
          <h1 class="card-content__title">
            {{ data?.name }}
          </h1>

          <div class="card-content__avatar" v-if="data?.options?.agent.exists">
            <img :src="data?.options?.agent?.avatar?.filename">
            <p>{{ data?.options?.agent?.name }}</p>
          </div>
          <div v-else>
            <p>{{ data?.description }}</p>
          </div>

          <div class="card-content__review" v-if="data?.options?.rating?.exists">
            <div class="stars">
            <div v-for="index in 5" :key="index" :class="{ 'card-content__star' : index <= data?.options?.rating?.value }">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.04894 0.927049C4.3483 0.0057385 5.6517 0.00573921 5.95106 0.92705L6.34708 2.1459C6.48096 2.55792 6.86491 2.83688 7.29814 2.83688H8.57971C9.54844 2.83688 9.95121 4.0765 9.1675 4.6459L8.13068 5.39919C7.7802 5.65383 7.63354 6.1052 7.76741 6.51722L8.16344 7.73607C8.46279 8.65738 7.40831 9.4235 6.6246 8.8541L5.58778 8.10081C5.2373 7.84617 4.7627 7.84617 4.41221 8.10081L3.3754 8.8541C2.59169 9.4235 1.53721 8.65738 1.83656 7.73607L2.23259 6.51722C2.36646 6.1052 2.2198 5.65383 1.86932 5.39919L0.832501 4.6459C0.0487874 4.0765 0.451563 2.83688 1.42029 2.83688H2.70186C3.13509 2.83688 3.51904 2.55792 3.65292 2.1459L4.04894 0.927049Z" fill="currentColor"/>
              </svg>
            </div>
            </div>
            <p>{{ data?.options?.rating?.review_amount }} <span>reviews</span></p>
          </div>
          <div class="card-content__meta" v-else>
            <div v-for="(item, key) in data?.options.meta.items" :key="key">
              <p>{{ item }}</p>
            </div>
          </div>
        </div>

        <div class="card-content__price">
          <strong>
            <p>${{ data?.options?.price?.weekly_value }}<span> per week</span>
            </p>
          </strong>
        </div>
        <div class="welcome-content__tooltip" >
        <img @click="info" src="/images/icon-tooltip.svg">
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed,defineProps, PropType ,defineEmits} from 'vue';
import { useStore } from 'vuex';

const store=useStore();
const isSelected=computed(()=>store.getters.selectedItems);

const props = defineProps({
    data: Object as PropType<AppCard>,

    selected: {
      type: Boolean,
      default: false
    }
})

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
      items:string[]
    },
    price: {
      exists:boolean,
      value:number,
      weekly_value:number
    }
  }
}

const emit=defineEmits([
  'info',
  'selection'
])

const info=()=>{
  emit('info')
}

const selection=()=>{
emit('selection',props.data?.id);
}


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
  position: relative;
}

.card-content__star {
  color: red;
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

.welcome-content__tooltip {
  display: flex;
  align-self: flex-end;
  margin-bottom: 20px;
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
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 9px;
  font-weight: 300;
  line-height: 10.67px;
  letter-spacing: -0.3px;
  color: #000000;
  opacity: 20%;
}

.stars {
  display: flex;
}

.card-content__meta {
  display: flex;
  font-size: 9px;
  gap: 10px;
  line-height: 10.67px;
  letter-spacing: -0.3px;
  width: 222px;
}

.check {
  background-color: #BE1E2D;
  width: 85px;
  height: 85px;
  border-radius: 50px;
  position: absolute;
  align-self: center;
}

.check img {
  display: flex;
  margin-left: 20px;
  margin-top: 15px;
}

@media (min-width: 480px) {
  .card-content {
    display: flex;
  }
  .class {
    display: flex;
   flex-wrap: wrap;
  }

  .card-content__description {
    min-width: 50%;
    position: relative;
  }
}
</style>
