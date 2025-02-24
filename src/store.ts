import { createStore } from "vuex";

const store = createStore ({
    state: {
        activeStep: 0,
        selectedItems:[] as {id:Number}[],
        currentSelectedItem:null
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
        }
    },

    actions: {
        UPDATE_STEP({commit},steps) {
            commit('SET_ACTIVE_STEP',steps);
        },
        UPDATE_SELECTED_ITEMS({commit},item){
            commit('SET_SELECTED_ITEMS',item)
        }
    },

    getters: {
        activeStep:state=>state.activeStep,
        selectedItems:(state) => state.selectedItems,
    }
})

export default store;
