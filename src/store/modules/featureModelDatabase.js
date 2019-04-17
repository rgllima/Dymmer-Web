// import router from "@/router";
import VueCookies from "vue-cookies";
import axios from "axios";

const state = {
  featureModelDatabase: [],
  apiURL: `https://dymmer-web-backend.herokuapp.com`,
  token: VueCookies.get("USERTOKEN"),
  error: null
};

const mutations = {
  setFeatureModelDatabase: (state, payload) => {
    state.featureModelDatabase = payload;
  },
  setError(state, payload) {
    state.error = payload;
  }
};

const actions = {
  fetchFeatureModelsOnDatabase: async context => {
    await axios
      .get(`${state.apiURL}/featuremodels/list`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      })
      .then(response => {
        console.log(response.data.featureModelList);
        let ftm = [];
        response.data.featureModelList.map(featureModel => {
          ftm.push(JSON.parse(featureModel.featureModelJson));
        });
        context.commit("setFeatureModelDatabase", ftm);
      })
      .catch(err => console.log(err));
  }
};

const getters = {
  getFeatureModelDatabase: state => state.featureModelDatabase
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
