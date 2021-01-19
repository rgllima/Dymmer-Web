import instance from "@/store/modules/axios.config";

const state = {
  splList: [],
  dsplList: [],
  privateList: [],
  isUpdate: false,
  error: null,
  loading: false
};

const mutations = {
  setSplList: (state, payload) => {
    state.splList = payload;
  },
  setDsplList: (state, payload) => {
    state.dsplList = payload;
  },
  setPrivateList: (state, payload) => {
    state.privateList = payload;
  },
  setIsUpdate(state, payload) {
    state.isUpdate = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  }
};

const actions = {
  fetchAllFeatureModelsOnDatabase: async context => {
    if (state.isUpdate) return;
    context.commit("setLoading", true);

    let url = `/featuremodels/list`;

    await instance
      .get(url)
      .then(response => {
        let ftm = [];
        response.data.featureModelList.map(featureModel => {
          let fmodel = JSON.parse(featureModel.featureModelJson);
          fmodel["_id"] = featureModel._id;
          fmodel["allowEdit"] = featureModel.allowEdit;
          fmodel["public"] = featureModel.public;
          ftm.push(fmodel);
        });

        let splList = ftm.filter(fmodel => fmodel.type === "SPL");
        let dsplList = ftm.filter(fmodel => fmodel.type === "DSPL");

        context.commit("setSplList", splList);
        context.commit("setDsplList", dsplList);
        context.commit("setIsUpdate", true);
        context.commit("setLoading", false);
      })
      .catch(err => console.log(err));
  },

  fetchPrivateFeatureModelsOnDatabase: async context => {
    if (state.isUpdate) return;
    context.commit("setLoading", true);

    let url = `/featuremodels/get-by-user`;

    await instance
      .get(url)
      .then(response => {
        let ftm = [];

        response.data.returnedFeatureModel.map(featureModel => {
          let fmodel = JSON.parse(featureModel.featureModelJson);
          fmodel["_id"] = featureModel._id;
          fmodel["allowEdit"] = featureModel.allowEdit;
          fmodel["public"] = featureModel.public;
          ftm.push(fmodel);
        });

        context.commit("setPrivateList", ftm);
        context.commit("setIsUpdate", true);
        context.commit("setLoading", false);
      })
      .catch(err => console.log(err));
  }
};

const getters = {
  getSplList: state => state.splList,
  getDsplList: state => state.dsplList,
  getPrivateList: state => state.privateList,
  getLoading: state => state.loading
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
