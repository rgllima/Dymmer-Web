// import router from "@/router";
// import axios from "axios";

import ft1 from "../../../test_files/featureModelExample";
import ft2 from "../../../test_files/featureModelExample2";

const state = {
  featureModelDatabase: [],
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
    let b = [];
    b.push(ft1.feature_model);
    b.push(ft2.feature_model);
    console.log(b);
    context.commit("setFeatureModelDatabase", b);
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
