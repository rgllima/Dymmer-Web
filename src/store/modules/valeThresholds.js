import router from "@/router";
import VueCookies from "vue-cookies";
import axios from "axios";

const state = {
    valeThresholds: {
        _id: '',
        thresholds: [],
        createdAt: ''
    },
    apiURL: `https://dymmer-web-backend.herokuapp.com`,
    token: VueCookies.get("USERTOKEN"),
    error: null
};

const mutations = {
    setValeThresholds: (state, payload) => {
        state.valeThresholds = payload;
    },
    setError(state, payload) {
        state.error = payload;
    }
};

const actions = {
    async fetchValeThresholds(context) {
        await axios({
            method: "get",
            url: `${state.apiURL}/valemethod/thresholds`,
            headers: {
                Authorization: `Bearer ${state.token}`
            }
        }).then(response => {
            let data = response.data.returnedValeThresholds
            context.commit("setValeThresholds", data);
            router.push("/measure-thresholds");
        }).catch(err => console.log(err));
    }
};

const getters = {
    getValeThresholds: state => state.valeThresholds
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};