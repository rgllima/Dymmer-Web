import axios from "axios";
import dymmerServer from "../../util/dymmer-server";

const state = {
  splList: [],
  dsplList: [],
  isUpdate: false,
  error: null
};

const mutations = {
  setSplList: (state, payload) => {
    state.splList = payload;
  },
  setDsplList: (state, payload) => {
    state.dsplList = payload;
  },
  setIsUpdate(state, payload) {
    state.isUpdate = payload;
  },
  setError(state, payload) {
    state.error = payload;
  }
};

const actions = {
  fetchAllFeatureModelsOnDatabase: async context => {
    if (state.isUpdate) return;

    let url = `${dymmerServer.getUrl()}/featuremodels/list`;

    await axios
      .get(url)
      .then(response => {
        let ftm = [];
        response.data.featureModelList.map(featureModel => {
          let fmodel = JSON.parse(featureModel.featureModelJson);
          fmodel["_id"] = featureModel._id;
          ftm.push(fmodel);
        });

        let splList = ftm.filter(fmodel => fmodel.type === "SPL");
        let dsplList = ftm.filter(fmodel => fmodel.type === "DSPL");

        context.commit("setSplList", splList);
        context.commit("setDsplList", dsplList);
        context.commit("setIsUpdate", true);
      })
      .catch(err => console.log(err));
  }
};

const getters = {
  getSplList: state => state.splList,
  getDsplList: state => state.dsplList
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
