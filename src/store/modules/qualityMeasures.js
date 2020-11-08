import instance from "@/store/modules/axios.config";

const state = {
  measures: [],
  valeThresholds: [],
  computedMeasures: [],
  groupedMeasuresThresholds: [],
  isUpdate: false
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
  },
  setIsUpdate(state, payload) {
    state.isUpdate = payload;
  }
};

const actions = {
  fetchMeasuresOnDatabase: async context => {
    if (state.isUpdate) return;

    let url = `/qualitymeasures/list`;
    await instance
      .get(url)
      .then(response => {
        context.commit("setMeasures", response.data.qualityMeasureList);
        context.commit("setIsUpdate", true);
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
    console.log(state.groupedMeasuresThresholds);
  },

  fetchComputedMeasures: async (context, obj) => {
    let url = `/qualitymeasures/apply`;

    await instance({
      method: "post",
      url: url,
      data: {
        measures: obj.measures,
        featureModel: obj.featureModel
      }
    })
      .then(response => {
        let data = response.data.appliedQualityMeasuresList;
        context.commit("setComputedMeasures", data);
      })
      .catch(err => console.log(err));
  },

  async fetchValeThresholds(context) {
    let url = `/valemethod/thresholds`;
    await instance
      .get(url)
      .then(response => {
        let data = response.data.returnedValeThresholds;
        context.commit("setValeThresholds", data);
      })
      .catch(err => console.log(err));
  },

  exportMeasuresToCSV: async context => {
    let url = `/qualitymeasures/export-to-csv`;
    const descriptionData = [
      "initials",
      "name",
      "value",
      "threshold_very_low",
      "threshold_low",
      "threshold_moderate",
      "threshold_high",
      "threshold_very_high"
    ];
    const data = state.groupedMeasuresThresholds.map(obj => [
      obj["initials"],
      obj["name"],
      obj["value"],
      obj["veryLow"],
      obj["low"],
      obj["moderate"],
      obj["high"],
      obj["veryHigh"]
    ]);
    const fModel = context.rootGetters["featureModel/getFeatureModel"];

    await instance
      .post(url, {
        dataDescription: descriptionData,
        data: data
      })
      .then(res => {
        let blob = new Blob([res.data], { type: "text/csv" });
        let url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `measures ${fModel["name"].toLowerCase()}.csv`
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
  },

  exportMeasuresToPDF: async context => {
    let url = `/qualitymeasures/export-to-pdf`;
    const descriptionData = [
      "initials",
      "name",
      "value",
      "threshold_very_low",
      "threshold_low",
      "threshold_moderate",
      "threshold_high",
      "threshold_very_high"
    ];
    const data = state.groupedMeasuresThresholds.map(obj => [
      obj["initials"],
      obj["name"],
      obj["value"],
      obj["veryLow"],
      obj["low"],
      obj["moderate"],
      obj["high"],
      obj["veryHigh"]
    ]);
    const fModel = context.rootGetters["featureModel/getFeatureModel"];

    await instance
      .post(url, {
        dataDescription: descriptionData,
        data: data
      })
      .then(res => {
        let blob = new Blob([res.data], { type: "application/pdf" });
        let url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `measures ${fModel["name"].toLowerCase()}.pdf`
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
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
