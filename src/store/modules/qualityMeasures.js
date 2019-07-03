import axios from "axios";
import dymmerServer from "../../util/dymmer-server";

const state = {
  measures: [],
  valeThresholds: [],
  computedMeasures: [],
  groupedMeasuresThresholds: []
};

const mutations = {
  setMeasures: (state, payload) => {
    state.measures = payload;
  },
  setValeThresholds: (state, payload) => {
    state.valeThresholds = payload;
  },
  setComputedMeasures: (state, payload) => {
    state.computedMeasures = payload;
  },
  setGroupedMeasuresThresholds: (state, payload) => {
    state.groupedMeasuresThresholds = payload;
  },
  resetGroupedMeasuresThresholds: state => {
    state.groupedMeasuresThresholds = [];
  }
};

const actions = {
  fetchMeasuresOnDatabase: async context => {
    let url = `${dymmerServer.getUrl()}/qualitymeasures/list`;
    await axios
      .get(url)
      .then(response => {
        context.commit("setMeasures", response.data.qualityMeasureList);
      })
      .catch(err => console.log(err));
  },

  applyMeasures: async (context, data) => {
    await context.dispatch("fetchComputedMeasures", data);
    await context.dispatch("fetchValeThresholds");

    let measures = state.computedMeasures;
    let valeThresholds = state.valeThresholds;

    let groupedMeasuresThresholds = [];
    measures.forEach(element => {
      let thresholds = valeThresholds.thresholds.filter(measure => {
        return element._id === measure.qualityMeasure._id;
      })[0];
      let a = {};
      Object.assign(a, element);
      Object.assign(a, thresholds);
      delete a["qualityMeasure"];
      groupedMeasuresThresholds.push(a);
    });

    context.commit("setGroupedMeasuresThresholds", groupedMeasuresThresholds);
  },

  fetchComputedMeasures: async (context, obj) => {
    let url = `${dymmerServer.getUrl()}/qualitymeasures/apply/${
      obj.featureModel._id
    }`;

    await axios({
      method: "post",
      url: url,
      data: {
        measures: obj.measures
      }
    })
      .then(response => {
        let data = response.data.appliedQualityMeasuresList;
        context.commit("setComputedMeasures", data);
      })
      .catch(err => console.log(err));
  },

  async fetchValeThresholds(context) {
    let url = `${dymmerServer.getUrl()}/valemethod/thresholds`;
    await axios
      .get(url)
      .then(response => {
        let data = response.data.returnedValeThresholds;
        context.commit("setValeThresholds", data);
      })
      .catch(err => console.log(err));
  }
};

const getters = {
  getMeasures: state => state.measures,
  getGroupedMeasuresThresholds: state => state.groupedMeasuresThresholds
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
