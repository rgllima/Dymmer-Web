import router from "@/router";
import axios from "axios";
import { runContextAnalysis } from "@/core/manageContextChanges.js";

const state = {
  hasChanged: false,
  featureModel: {
    feature_tree: [],
    constraints: [],
    contexts: []
  },
  apiURL: `https://dymmer-web-backend.herokuapp.com`,
  error: null
};

const mutations = {
  setHasChanged: (state, payload) => {
    state.hasChanged = payload;
  },
  setFeatureModel: (state, payload) => {
    state.featureModel = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  addContext(state, payload) {
    state.featureModel.contexts.push(payload);
  },
  selectContext(state, payload) {
    state.featureModel.contexts.map(context => {
      if (context.name === payload) context["isTheCurrent"] = true;
      else context["isTheCurrent"] = false;
    });
  },
  changeFeatureStatus(state, payload) {
    console.log("Store", payload);
    state.featureModel.contexts.map(context => {
      if (context.isTheCurrent) {
        // console.log(context);
        context.resolutions.map(feature => {
          if (feature.feature_id === payload.id) {
            feature.status = payload.status;
            state.hasChanged = true; // Flag. There was some changes in Feature Model
            console.log("Alterei");
          }
        });
      }
    });
  }
};

const actions = {
  convertXmlToJson: async (context, xmlString) => {
    await axios
      .post(`${state.apiURL}/xml/xml-to-json`, {
        xmlString: xmlString
      })
      .then(res => {
        console.log(JSON.parse(JSON.stringify(res.data)));
        context.commit("setFeatureModel", res.data);
        router.push("/fmodel-manager");
      });
  },

  showFeatureModel: async (context, data) => {
    context.commit("setFeatureModel", data);
    router.push("/fmodel-manager");
  },

  changeContext(context, data) {
    let a = runContextAnalysis(data, state.featureModel);
    console.log("A:", a);
    a.map(feature => {
      context.commit("changeFeatureStatus", feature);
    });
  },

  saveFeatureModel: async (context, data) => {}
};

const getters = {
  getHasChanged: state => state.hasChanged,
  getFeatureModel: state => state.featureModel,
  getFeatureModelContext: state => state.featureModel.contexts
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
