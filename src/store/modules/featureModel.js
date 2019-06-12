import router from "@/router";
import axios from "axios";

const state = {
  featureModel: {
    feature_tree: [],
    constraints: [],
    contexts: []
  },
  apiURL: `https://dymmer-web-backend.herokuapp.com`,
  error: null
};

const mutations = {
  setFeatureModel: (state, payload) => {
    state.featureModel = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  addContext(state, payload) {
    state.featureModel.contexts.push(payload);
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

  selectContext: (context, name) => {
    let featureModel = state.featureModel;
    featureModel.contexts.map(context => {
      if (context.name === name) context["active"] = true;
      else context["active"] = false;
    });
    context.commit("setFeatureModel", {});
    context.commit("setFeatureModel", featureModel);
  }
};

const getters = {
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
