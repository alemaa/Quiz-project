import { createStore } from "vuex";

const store = createStore ({
    state: {
        activeStep: 0,
        selectedItems:[] as {id:number}[],
    },

    mutations: {
        SET_ACTIVE_STEP(state,steps) {
            state.activeStep=steps
        },
        SET_SELECTED_ITEMS(state,item) {
         const index = state.selectedItems.findIndex((selected)=>selected.id === item.id);
        if(index !== -1) {
            state.selectedItems.splice(index,1);
             }
            else {
              state.selectedItems.push(item);
          }
        }
    },

    actions: {
        UPDATE_STEP({commit},steps) {
            commit('SET_ACTIVE_STEP',steps);
        },
        UPDATE_SELECTED_ITEMS({commit},items){
            commit('SET_SELECTED_ITEMS',items)
        }
    },

    getters: {
        activeStep:state=>state.activeStep,
        selectedItems:(state) => state.selectedItems,
        activeScreen:(state)=>{
            const screens=["start","property","cars","fashion"]
            return screens[state.activeStep] || "start";
        }
    }
})

export default store;
