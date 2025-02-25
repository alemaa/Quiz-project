<template>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
      rel="stylesheet"
    />
    <meta charset="UTF-8" />
  </head>
  <div class="welcome-content">
    <main>
      <img :src="header" />
      <div class="welcome-content__description">
        <div v-if="activeStep === stepId.START">
          {{ description }}
        </div>
        <br />
        <div v-if="activeStep === stepId.START">
          {{ descriptionTwo }}
        </div>

        <div v-if="gender">
          <h2 class="fashion-description">{{ fasionDescription }}</h2>
          <div class="gender-icons">
            <div class="gender-male">
              <img
                @click="fashionMale"
                src="/svg/icons/gender_male.svg"
                alt="male icon"
              />
              <strong><p>Male</p></strong>
            </div>
            <div class="gender-female">
              <img
                @click="fashionFemale"
                src="/svg/icons/gender_female.svg"
                alt="female icon"
              />
              <strong><p>Female</p></strong>
            </div>
          </div>
        </div>
      </div>

      <template v-for = "(item, index) in data.screens" :key="index">
        <AppScreens v-if = "activeStep === item.screen_id" :screen="item" />
      </template>

      <!-- <ReportScreen v-if="activeStep===3" :categories="data.categories"
  /> -->
      <div v-if="!gender"
        class="welcome-content__button"
        :class="{ 'welcome-content__button--white': activeStep > stepId.START }"
      >
        <div class="button">
          <button
            id="start"
            @click="startQuiz"
            :disabled="activeStep > stepId.START && activeStep<=stepId.CARS && !isItemSelected"
            :class="{ 'welcome-content__button--txtColor': activeStep > stepId.START && activeStep<=stepId.CARS}"
          >
            {{ activeStep ? text : text }}
          </button>
        </div>
        <span
          class="welcome-content__screens"
          v-if="activeStep !== stepId.START"
        >
          {{ activeStep }} of {{ Object.keys(data.screens).length }}
        </span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import AppScreens from "./components/AppScreens.vue";
import data from "@/assets/data.json";

const store = useStore();

const selectedItems = computed(() => store.getters.selectedItems);

const isItemSelected = computed(() => store.state.currentSelectedItem);

const activeStep = computed(() => store.getters.activeStep);

const description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
  but also the leap into electronic typesetting, remaining essentially unchanged.`;
const descriptionTwo = `It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
  like Aldus PageMaker including versions of Lorem Ipsum.`;

const fasionDescription = `Please choose your gender to proceed:`;

const stepId = {
  START: 0,
  PROPERTY: 1,
  CARS: 2,
  FASHION: 3,
};

watchEffect(() => {
  console.log("Selected Items:", selectedItems.value);
});

const screens = ref(data.categories);

const category = ref([
  {
    id: 1,
    image: "/svg/logos/logo_real-estate.svg",
    text: "Select Property",
    btnColor: "#BE1E2D",
  },
  {
    id: 2,
    image: "/svg/logos/logo_cars-4-sale.svg",
    text: "Select Vehicle",
    btnColor: "#107FC4",
  },
  {
    id: 3,
    image: "/svg/logos/fashion_fit.svg",
    text: "Select Outfit",
    btnColor:"#F5DDFDB0"
  },
]);

const header = computed(() => {
  const currentScreen = category.value.find(
    (screen) => screen.id === store.state.activeStep
  );
  return currentScreen ? currentScreen.image : "/svg/logos/logoLoremipsum.svg";
});

const text = computed(() => {
  const currentScreen = category.value.find(
    (screen) => screen.id === store.state.activeStep
  );
  return currentScreen ? currentScreen.text : "Start Quiz";
});

const bgColor = computed(() => {
  // if (activeStep.value === 3) {
  //   return "#C6D9F3";
  // }
  // else {
  const currentScreen = screens.value.find(
    (screen) => screen.id === activeStep.value
  );
  return currentScreen ? currentScreen.color : "#ffffff";
  //}
});
console.log(data.screens.fashion.male,'fashion-male')
console.log(data.screens.fashion.female,'fashion-female')

const updateColor = () => {
  document.body.style.setProperty("--backgroundColor", bgColor.value);
};

const btnColor = computed(() => {
  const currentScreen = category.value.find(
    (screen) => screen.id === activeStep.value
  );
  return currentScreen ? currentScreen.btnColor : "#ffffff";
});

const updateBtnColor = () => {
  document.getElementById("start").style.setProperty("--btnColor", btnColor.value);
};

const gender = ref(false);

const startQuiz = () => {
  if (store.state.currentSelectedItem) {
    store.dispatch("UPDATE_SELECTED_ITEMS", store.state.currentSelectedItem);
  }
  store.state.currentSelectedItem = null;

  if (activeStep.value === stepId.CARS && !gender.value) {
    gender.value = true;
  }

  console.log(gender.value, 'gendderr')
  store.dispatch("UPDATE_STEP", activeStep.value + 1);

  if(activeStep.value >3 ){
    store.dispatch('UPDATE_STEP',0);
  }

  updateColor();
  updateBtnColor();
};

const fashionMale = () => {
  gender.value = false;
  store.dispatch("UPDATE_STEP", activeStep.value);
  console.log(gender.value,'gender male')
};

const fashionFemale = () => {
  gender.value = false;
  store.dispatch("UPDATE_STEP", activeStep.value);
  console.log(gender.value,'gender female')
}

watchEffect(() => {
  console.log(activeStep.value, "active step");
});
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
  --backgroundColor: white;
  --btnColor: white;
}

.fashion-description {
  color: black;
  text-align: center;
  font-weight: 500;
  margin-top: -20px;
}

.gender-icons {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-top: 100px;
}

.gender-male,
.gender-female {
  display: flex;
  flex-direction: column;
  align-items: center;
}

body {
  background-color: var(--backgroundColor);
  padding-bottom: 70px;
}

.welcome-content {
  max-width: 1050px;
  padding: 0 20px;
  margin: 0 auto;
  font-family: "Nunito";
  display: flex;
  justify-content: center;
}

.welcome-content__screens {
  font-size: 20px;
  font-weight: 700;
  line-height: 27.28px;
  letter-spacing: -0.3px;
  flex-basis: 30%;
  text-align: center;
}

.welcome-content__description {
  margin-top: 50px;
  text-align: start;
  line-height: 25.6px;
  font-weight: 400;
  font-size: 16px;
  color: #1f2c41;
}

.welcome-content__button {
  min-width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: black;
  border: 1px solid black;
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
}

.button {
  flex-basis: 70%;
  text-align: end;
}

.welcome-content__button--white {
  background-color: white;
  border: 2px solid white;
}

.welcome-content__button--txtColor {
  color: white;
}

#start {
  min-width: 60%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  border: 2px;
  background-color: var(--btnColor);
}

#start:disabled {
  opacity: 55%;
}

.report-content {
  background-color: white;
}
</style>
