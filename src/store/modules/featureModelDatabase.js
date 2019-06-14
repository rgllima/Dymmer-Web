import axios from "axios";

const state = {
  featureModelDatabase: [],
  apiURL: `https://dymmer-web-backend.herokuapp.com`,
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
      .get(`${state.apiURL}/featuremodels/list`)
      .then(response => {
        let ftm = [];
        response.data.featureModelList.map(featureModel => {
          let fmodel = JSON.parse(featureModel.featureModelJson);
          fmodel["_id"] = featureModel._id;
          ftm.push(fmodel);
        });
        console.log(JSON.parse(JSON.stringify(ftm)))
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
