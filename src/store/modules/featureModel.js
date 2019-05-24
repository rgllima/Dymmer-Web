import router from "@/router";
import axios from "axios";

const state = {
  featureModel: {
    feature_tree: [],
    constraints: []
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
        router.push("/show-feature-model");
      });
  },

  showFeatureModel: async (context, data) => {
    context.commit("setFeatureModel", data);
    router.push("/show-feature-model");
  }
};

const getters = {
  getFeatureModel: state => state.featureModel
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
