import { createStore } from "vuex";

const store = createStore ({
    state: {
        activeStep: 0,
        selectedProperty:null,
        selectedCar:null,
    },

    mutations: {
        SET_ACTIVE_STEP(state,steps) {
            state.activeStep=steps
        },
        SET_SELECTED_PROPERTY(state, propertyId) {
            state.selectedProperty = state.selectedProperty === propertyId ? null : propertyId;
        },
          SET_SELECTED_CAR(state, carId) {
            state.selectedCar = state.selectedCar === carId ? null :carId;
        },
    },

    actions: {
        UPDATE_STEP({commit},steps) {
            commit('SET_ACTIVE_STEP',steps);
        },
        UPDATE_SELECTED_PROPERTY({ commit }, propertyId) {
            commit("SET_SELECTED_PROPERTY", propertyId);
        },
        UPDATE_SELECTED_CAR({ commit }, carId) {
            commit("SET_SELECTED_CAR", carId);
        },
    },

    getters: {
        activeStep:state=>state.activeStep,
        selectedProperty: (state) => state.selectedProperty,
        selectedVehicle: (state) => state.selectedCar,
    }
})

export default store;
