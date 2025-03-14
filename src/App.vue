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
  <main>
    <div class="welcome">
      <img :src="header" v-if="activeStep < stepId.REPORT" alt="title"/>
      <div class="welcome-description">
        <span v-if="activeStep === stepId.START">
          {{ description }}
        </span>
        <br />
        <span v-if="activeStep === stepId.START">
          {{ descriptionTwo }}
        </span>

        <div v-if="displayGenderScreen">
          <h2 class="welcome-fashion__description">{{ fasionDescription }}</h2>
          <div class="welcome-fashion__gender">
            <div v-for="(gender, index) in genderSelect" :key="index">
              <button class="welcome-gender__icons" @click="fashionGender(gender.value)">
                <img :src="gender.image" alt="gender icon" />
                <strong>
                  <p>{{ gender.text }}</p>
                </strong>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <template
          v-for="(item, index) in Object.values(data.screens)"
          :key="index"
        >
          <template v-if="activeStep === item.screen_id">
            <template v-if="activeStep === stepId.FASHION && genderValue">
              <AppScreens
                v-for="(fashion, index) in Object.values(item[genderValue])"
                :data="fashion.data"
                :id="fashion.id"
                :key="index"
              />
            </template>

            <AppScreens v-else :data="item.data" />
          </template>
        </template>
      </div>
      <ReportScreen
        v-if="activeStep === stepId.REPORT"
        :categories="data.categories"
      />
      <div
        v-if="!displayGenderScreen && activeStep <= stepId.FASHION"
        class="welcome-button"
        :class="{ 'welcome-button--white': activeStep > stepId.START }"
      >
        <div class="button">
          <button
            class="start"
            @click="startQuiz"
            :disabled="activeStep > stepId.START && !isItemSelected"
            :class="{
              'welcome-button--txtColor':
                activeStep > stepId.START && activeStep <= stepId.CARS,
            }"
            :style="{ backgroundColor: btnColor }"
          >
            {{ activeStep ? text : text }}
          </button>
        </div>
        <span
          class="welcome-screens"
          v-if="activeStep !== stepId.START"
        >
          <b>{{ activeStep }}</b> of
          <b>{{ Object.keys(data.screens).length }}</b>
        </span>
        {{ item }}
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import AppScreens from "./components/AppScreens.vue";
import data from "@/assets/data.json";
import ReportScreen from "./components/ReportScreen.vue";

const store = useStore();
const selectedItems = computed(() => store.getters.selectedItems);
const activeStep = computed(() => store.getters.activeStep);
const stepId = computed(() => store.getters.stepId);
const displayGenderScreen = computed(() => store.getters.displayGenderScreen);
const currentSelectedItem = computed(() => store.getters.currentSelectedItem);
const genderValue = computed(() => store.getters.genderValue);
const categories = computed(() => data.categories);
const isItemSelected = computed(() =>  currentSelectedItem.value || selectedItems.value[activeStep.value -1]);

const description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
  but also the leap into electronic typesetting, remaining essentially unchanged.`;
const descriptionTwo = `It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
  like Aldus PageMaker including versions of Lorem Ipsum.`;

const fasionDescription = `Please choose your gender to proceed:`;

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
  },
]);

const genderSelect = ref([
  {
    id: 1,
    image: "/svg/icons/gender_male.svg",
    text: "Male",
    value: "male",
  },
  {
    id: 2,
    image: "/svg/icons/gender_female.svg",
    text: "Female",
    value: "female",
  },
]);

const header = computed(() => {
  const currentScreen = category.value.find(
    (screen) => screen.id === activeStep.value
  );
  return currentScreen ? currentScreen.image : "/svg/logos/logoLoremipsum.svg";
});

const text = computed(() => {
  const currentScreen = category.value.find(
    (screen) => screen.id === activeStep.value
  );
  return currentScreen ? currentScreen.text : "Start Quiz";
});


const bgColor = computed(() => {
  switch(true) {
    case activeStep.value === stepId.value.REPORT :
    return "#C6D9F3";
    case activeStep.value === stepId.value.FASHION && genderValue.value === "male":
    return "#6AC0F063";
    case activeStep.value === stepId.value.FASHION && genderValue.value === "female":
    return "#F5DDFDB0" ;
    default: {
    const currentScreen = categories.value.find(
      (screen) => screen.id === activeStep.value
    );
    return currentScreen ? currentScreen.color : "#ffffff";
    }
  }
});

const updateColor = () => {
  document.body.style.setProperty("--backgroundColor", bgColor.value);
};

watch(activeStep, () => {
  updateColor();
});

const btnColor = computed(() => {
  switch(true) {
    case activeStep.value === stepId.value.FASHION && genderValue.value === "male":
      return "#C5E6F9";
    case activeStep.value === stepId.value.FASHION && genderValue.value === "female":
      return "#F5DDFDB0";
    default: {
      const currentScreen = category.value.find(
        (screen) => screen.id === activeStep.value
      );
      return currentScreen ? currentScreen.btnColor : "#ffffff";
    }
  }
});

const startQuiz = () => {
  if (currentSelectedItem.value) {
    store.dispatch("UPDATE_SELECTED_ITEMS", {
      item: currentSelectedItem.value,
      position: activeStep.value - 1,
    });
  }
  store.dispatch("UPDATE_CURRENT_SELECTED_ITEM" , null);

  if (activeStep.value === stepId.value.CARS && !displayGenderScreen.value) {
    store.dispatch("UPDATE_GENDER_SCREEN", true);
  }
  store.dispatch("UPDATE_STEP", activeStep.value + 1);
};

const fashionGender = (selectedGender) => {
  store.dispatch("UPDATE_GENDER", selectedGender);
  store.dispatch("UPDATE_GENDER_SCREEN", false);
  store.dispatch("UPDATE_STEP", activeStep.value);

  updateColor();
  watch(activeStep, () => {
    fashionGender(selectedGender);
  });
};

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
  --btnColor: #ffffff;
}

body {
  background-color: var(--backgroundColor);
  padding-bottom: 70px;
}

.welcome {
  max-width: 1050px;
  padding: 0 20px;
  margin: 0 auto;
  font-family: "Nunito";
}

.welcome img {
  max-width: 100%;
}

.welcome-fashion__description {
  color: black;
  text-align: center;
  font-weight: 500;
  margin-top: -20px;
}

.welcome-fashion__gender {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.welcome-gender__icons {
  background-color: #eff5fb;
  border: #eff5fb;
  cursor: pointer;
}

.welcome-description {
  margin-top: 50px;
  text-align: start;
  line-height: 25.6px;
  font-weight: 400;
  font-size: 16px;
  color: #1f2c41;
}

.welcome-button {
  min-width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: black;
  border: 1px solid black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  z-index: 100;
}

.button {
  flex-basis: 70%;
  text-align: end;
}

.welcome-button--white {
  background-color: white;
  border: 2px solid white;
}

.welcome-button--txtColor {
  color: white;
}

.start {
  min-width: 60%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  border: 2px;
  background-color: var(--btnColor);
  cursor: pointer;
}

.welcome-screens {
  font-size: 20px;
  line-height: 27.28px;
  letter-spacing: -0.3px;
  flex-basis: 30%;
}

.start:disabled {
  opacity: 55%;
}
</style>
