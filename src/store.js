import { createStore } from "vuex";

const store=createStore({
    state: {
        activeStep:-1,
        backgroundColor:'#FFFFFF',
        headerImage:'/lorem.png',
    },

    mutations: {
        SET_BACKGROUND_COLOR(state,color){
            state.backgroundColor=color
        },
        SET_HEADER_IMAGE(state,image){
            state.headerImage=image
        },
    },

    actions: {
        UPDATE_BACKGROUND_COLOR({commit},color){
            commit('SET_BACKGROUND_COLOR',color);
        },
        UPDATE_HEADER_IMAGE({commit},image){
            commit('SET_HEADER_IMAGE',image);
        },
    },

    getters:{
        backgroundColor:state=>state.backgroundColor,
        headerImage:state=>state.headerImage,
    }


})

export default store;