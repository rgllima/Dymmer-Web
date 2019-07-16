import axios from "axios";

const state = {
  featureModelDatabase: [],
  isUpdate: false,
  apiURL: `https://dymmer-web-backend.herokuapp.com`,
  error: null
};

const mutations = {
  setFeatureModelDatabase: (state, payload) => {
    state.featureModelDatabase = payload;
  },
  setIsUpdate(state, payload) {
    state.isUpdate = payload;
  },
  setError(state, payload) {
    state.error = payload;
  }
};

const actions = {
  fetchFeatureModelsOnDatabase: async context => {
    if (state.isUpdate) return;

    await axios
      .get(`${state.apiURL}/featuremodels/list`)
      .then(response => {
        let ftm = [];
        response.data.featureModelList.map(featureModel => {
          let fmodel = JSON.parse(featureModel.featureModelJson);
          fmodel["_id"] = featureModel._id;
          ftm.push(fmodel);
        });
        console.log(JSON.parse(JSON.stringify(ftm)));
        context.commit("setFeatureModelDatabase", ftm);
        context.commit("setIsUpdate", true);
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
