import { createStore } from "vuex";

const store = createStore ({
    state: {
        activeStep: 0,
        rating:0,
        selectedItems:[] ,
    },

    mutations: {
        SET_ACTIVE_STEP(state,steps) {
            state.activeStep=steps
        },
        SET_SELECTED_ITEMS(state, id) {
            state.selectedItems = state.selectedItems === id ? null : id;
        },
    },

    actions: {
        UPDATE_STEP({commit},steps) {
            commit('SET_ACTIVE_STEP',steps);
            },
        UPDATE_SELECTED_ITEMS({commit},items){
            commit('SET_SELECTED_ITEMS',items)
            }
    },

    getters:{
        activeStep:state=>state.activeStep,
        rating:state=>state.rating,
        selectedItems:state=>state.selectedItems,
    }
})

export default store;
