import router from "@/router";
// import VueCookies from "vue-cookies";
// import axios from "axios";

import measures from "../../../test_files/quality_measures.json";
import { calculate } from "../../../test_files/measures/calculateMeasures.js";

const state = {
  measures: [],
  //AQUI
  resultMeasuresComputation: [],
  error: null
};

const mutations = {
  setMeasures: (state, payload) => {
    state.measures = payload;
  },
  //AQUI
  setResultMeasuresComputation: (state, payload) => {
    state.resultMeasuresComputation = payload;
  }
};

const actions = {
  fetchMeasuresOnDatabase: async context => {
    context.commit("setMeasures", measures);
  },

  //OBS. RETIRAR ISSO DAQUI, É OUTRO MÓDULO
  calculateSelectedMeasures: async (context, obj) => {
    // console.log(obj);
    let response = await calculate(obj.measures, obj.featureTree);
    console.log(response);
    context.commit("setResultMeasuresComputation", response);
    router.push("/measures-shower");
  }
};

const getters = {
  getMeasuresModel: state => state.measures,
  //AQUI
  getResultMeasuresComputation: state => state.resultMeasuresComputation
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
