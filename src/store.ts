import { createStore } from "vuex";

const store = createStore ({
    state: {
        activeStep: 0,
        selectedItems:[] as {id:Number}[],
        currentSelectedItem:null,
        genderValue:null,
    },

    mutations: {
        SET_ACTIVE_STEP(state,steps) {
            state.activeStep=steps
        },
        SET_SELECTED_ITEMS(state,item) {
            const index = state.selectedItems.findIndex((selected)=>selected.id === item.id);
            if(index !== -1) {
                state.selectedItems.splice(index,1);
                console.log(state.selectedItems, 'i ifffff');
            } else {
                 state.selectedItems.push(item);
                console.log(state.selectedItems, 'state selected items');
            }
        },
        SET_GENDER_VALUE(state,gender){
            state.genderValue=gender
        }
    },

    actions: {
        UPDATE_STEP({commit},steps) {
            commit('SET_ACTIVE_STEP',steps);
        },
        UPDATE_SELECTED_ITEMS({commit},item){
            commit('SET_SELECTED_ITEMS',item)
        },
        UPDATE_GENDER_VALUE({commit},gender){
            commit('SET_GENDER_VALUE',gender)
        }
    },

    getters: {
        activeStep:(state)=>state.activeStep,
        selectedItems:(state) => state.selectedItems,
        currentSelectedItem:(state)=>state.currentSelectedItem,
        genderValue:(state)=>state.genderValue
    }
})

export default store;
