import router from "@/router";
import axios from "axios";

const state = {
  measures: [],
  //AQUI
  resultMeasuresComputation: [],
  apiURL: `https://dymmer-web-backend.herokuapp.com`,
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
    await axios
      .get(`${state.apiURL}/qualitymeasures/list`)
      .then(response => {
        context.commit("setMeasures", response.data.qualityMeasureList);
      })
      .catch(err => console.log(err));
  },

  //OBS. RETIRAR ISSO DAQUI, É OUTRO MÓDULO
  calculateSelectedMeasures: async (context, obj) => {
    await axios({
      method: "post",
      url: `${state.apiURL}/qualitymeasures/apply/${obj.featureTree}`,
      data: {
        measures: obj.measures
      }
    })
      .then(response => {
        let data = response.data.appliedQualityMeasuresList;
        context.commit("setResultMeasuresComputation", data);
        // router.push("/measures-shower");
      })
      .catch(err => console.log(err));
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
