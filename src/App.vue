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

        <div v-if="displayGenderScreen">
          <h2 class="fashion-description">{{ fasionDescription }}</h2>
          <div class="gender">
            <div v-for="(gender, index) in genderSelect" :key="index">
              <button class="gender-icons" @click="fashionGender(gender.value)">
                <img :src="gender.image" alt="gender icon" />
                <strong><p>{{ gender.text }}</p></strong>
              </button>
            </div>
          </div>
        </div>

      </div>
      <div>
        <template v-for="(item, index) in Object.values(data.screens)" :key="index">
          <!-- try to optimize this with the computed and formatting data, instead of two v-for -->
           <template v-if="activeStep === item.screen_id">
             <template v-if="activeStep === stepId.FASHION && genderValue">
              <AppScreens
                v-for="(fashion, index) in Object.values(item[genderValue])"
                :data="fashion.data"
                :key="index"
              />
            </template>

            <AppScreens
                 v-else
                :data="item.data"
              />
           </template>


          <!-- <AppScreens
            v-if="activeStep === item.screen_id"
            :data="activeStep === stepId.FASHION && genderValue ?
            item[genderValue][index]?.data : item.data"
          /> -->

        </template>
      </div>
       <ReportScreen v-if="activeStep>stepId.FASHION" :categories="data.categories"/>
      <div
        v-if="!displayGenderScreen && activeStep <= stepId.FASHION"
        class="welcome-content__button"
        :class="{ 'welcome-content__button--white': activeStep > stepId.START }"
      >
        <div class="button">
          <button
            id="start"
            @click="startQuiz"
            :disabled="
              activeStep > stepId.START &&
              !isItemSelected
            "
            :class="{
              'welcome-content__button--txtColor':
                activeStep > stepId.START && activeStep <= stepId.CARS,
            }"
            :style="{ backgroundColor: btnColor }"
          >
            {{ activeStep ? text : text }}
          </button>
        </div>
        <span
          class="welcome-content__screens"
          v-if="activeStep !== stepId.START"
        >
          <b>{{ activeStep }}</b> of <b>{{ Object.keys(data.screens).length }}</b>
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

const genderSelect = ref([
  {
    id: 1,
    image: "/svg/icons/gender_male.svg",
    text: "Male",
    value: "male"
  },
  {
    id: 2,
    image: "/svg/icons/gender_female.svg",
    text: "Female",
    value: "female",
  },
]);
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

// const fashionData = computed (() => {
//   if(gender.value) {
//     return gender.value==="male" ? data.screens.fashion.male : data.screens.fashion.female;
//   }
//   return [];
// })

const stepId = {
  START: 0,
  PROPERTY: 1,
  CARS: 2,
  FASHION: 3,
  REPORT:4
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
  },
  {
    id:4,
  }
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
  if (genderValue.value === "male") {
    return "#C5E6F9";
  }
 else if (genderValue.value === "female") {
    return "#F5DDFDB0";
  }
  const currentScreen = screens.value.find(
    (screen) => screen.id === activeStep.value
  );
  return currentScreen ? currentScreen.color : "#ffffff";
});

const updateColor = () => {
  document.body.style.setProperty("--backgroundColor", bgColor.value);
};

const btnColor = computed(() => {
  if (genderValue.value === "male") {
    return "#C5E6F9";
  } else if (genderValue.value === "female") {
    return "#F5DDFDB0";
  }

  const currentScreen = category.value.find(
    (screen) => screen.id === activeStep.value
  );
  return currentScreen ? currentScreen.btnColor : "#ffffff";
  });

const displayGenderScreen = ref(false);
const startQuiz = () => {
  if (store.state.currentSelectedItem) {
    store.dispatch("UPDATE_SELECTED_ITEMS", store.state.currentSelectedItem);
  }
  store.state.currentSelectedItem = null;

  if (activeStep.value === stepId.CARS && !displayGenderScreen.value) {
    displayGenderScreen.value = true;
  }

  console.log(displayGenderScreen.value, "gendderr display screen");
  store.dispatch("UPDATE_STEP", activeStep.value + 1);

  updateColor();
};

//const genderValue = computed(()=>store.getters.genderValue);
const genderValue = ref("");

console.log(data.screens.fashion.male, "fashion-male");
console.log(data.screens.fashion.female, "fashion-female");

const fashionGender = (selectedGender) => {
  genderValue.value = selectedGender;
  console.log(genderValue.value,':selected gender')

  displayGenderScreen.value = false;

  store.dispatch("UPDATE_STEP", activeStep.value);

  updateColor();

  console.log(displayGenderScreen.value, "gender female");
};

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
  background-color: #eff5fb;
  border: #eff5fb;
}

.gender {
  display: flex;
  justify-content: center;
  margin-top: 100px;
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
  padding-top: 12px;
  padding-bottom: 12px;
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
