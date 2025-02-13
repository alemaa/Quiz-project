import { createStore } from "vuex";

const store = createStore ({
    state: {
        activeStep: 0,
        rating:0,
        selectedItems:[],
    },

    mutations: {
        SET_ACTIVE_STEP(state,steps) {
            state.activeStep=steps
        },
    },

    actions: {
        UPDATE_STEP({commit},steps) {
            commit('SET_ACTIVE_STEP',steps);
            },

    },

    getters:{
        activeStep:state=>state.activeStep,
        rating:state=>state.rating,
        selectedItems:state=>state.selectedItems,
    }
})

export default store;
