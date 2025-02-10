import { createStore } from "vuex";

const store = createStore ({
    state: {
        activeStep:-1,
    },

    mutations: {
        SET_ACTIVE_STEP(state,steps) {
            state.activeStep=steps
        }
    },

    actions: {
        UPDATE_STEP({commit},steps) {
            commit('SET_ACTIVE_STEP',steps);
        }
    },

    getters:{
        activeStep:state=>state.activeStep,
    }
})

export default store;