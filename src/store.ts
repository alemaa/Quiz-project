import { createStore } from "vuex";

const store = createStore ({
    state: {
        activeStep: 0,
        selectedItems:[] as {id:Number}[],
        currentSelectedItem: null,
        genderValue:"",
        displayGenderScreen:false,
        stepId : {
            START:0,
            PROPERTY:1,
            CARS:2,
            FASHION:3,
            REPORT:4
        }
    },

    mutations: {
        SET_ACTIVE_STEP(state,steps) {
            state.activeStep=steps
        },
        SET_SELECTED_ITEMS(state, { item, position }) {
            if (position < state.selectedItems.length) {
                state.selectedItems.splice(position, 1, item);
            } else {
                state.selectedItems.push(item)
            }
        },
        SET_CURRENT_SELECTED_ITEM(state, item) {
            state.currentSelectedItem = item;
            console.log("SET_CURRENT_SELECTED_ITEM:", state.currentSelectedItem);
        },
        SET_GENDER(state, gender) {
            state.genderValue = gender;
        },
        SET_GENDER_SCREEN(state,genderScreen){
            state.displayGenderScreen = genderScreen;
        }
    },

    actions: {
        UPDATE_STEP({commit},steps) {
            commit('SET_ACTIVE_STEP',steps);
        },
        UPDATE_SELECTED_ITEMS({commit}, payload) {
            commit('SET_SELECTED_ITEMS', payload)
        },
        UPDATE_GENDER({commit},gender) {
            commit('SET_GENDER',gender)
        },
        UPDATE_GENDER_SCREEN({commit},genderScreen) {
            commit('SET_GENDER_SCREEN',genderScreen)
        },
        UPDATE_CURRENT_SELECTED_ITEM({commit},item) {
            commit('SET_CURRENT_SELECTED_ITEM',item)
        }
    },

    getters: {
        activeStep:(state)=>state.activeStep,
        selectedItems:(state) => state.selectedItems,
        currentSelectedItem:(state)=>state.currentSelectedItem,
        genderValue:(state)=>state.genderValue,
        displayGenderScreen:(state)=>state.displayGenderScreen,
        stepId:(state)=>state.stepId
    }
})

export default store;
