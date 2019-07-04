import router from "@/router";
import axios from "axios";
import dymmerServer from "../../util/dymmer-server";
import { runContextAnalysis } from "@/core/manageContextChanges.js";

const state = {
  hasChanged: false,
  featureModel: {
    feature_tree: [],
    constraints: [],
    contexts: []
  }
};

const mutations = {
  setHasChanged: (state, payload) => {
    state.hasChanged = payload;
  },
  setFeatureModel: (state, payload) => {
    state.featureModel = payload;
  },
  addContext(state, payload) {
    state.featureModel.contexts.push(payload);
    if (state.featureModel.type === "SPL") state.featureModel.type = "DSPL";
    state.hasChanged = true;
  },
  selectContext(state, payload) {
    state.featureModel.contexts.map(context => {
      if (context.name === payload) context["isTheCurrent"] = true;
      else context["isTheCurrent"] = false;
    });
  },
  changeFeatureStatus(state, payload) {
    state.featureModel.contexts.map(context => {
      if (context.isTheCurrent) {
        let feature = context.resolutions.filter(
          feature => feature.feature_id === payload.id
        )[0];

        if (!feature)
          context.resolutions.push({
            feature_id: payload.id,
            status: payload.status
          });
        else feature.status = payload.status;
      }
    });
  }
};

const actions = {
  convertXmlToJson: async (context, xmlString) => {
    let url = `${dymmerServer.getUrl()}/xml/xml-to-json`;
    await axios
      .post(url, {
        xmlString: xmlString
      })
      .then(res => {
        console.log(JSON.parse(JSON.stringify(res.data)));
        context.commit("setFeatureModel", res.data);
        context.commit("setHasChanged", false);
        context.commit("qualityMeasures/resetGroupedMeasuresThresholds", null, {
          root: true
        });

        router.push("/fmodel-manager");
      });
  },

  // Move this to "Mutations"
  showFeatureModel: async (context, data) => {
    context.commit("setFeatureModel", data);
    context.commit("setHasChanged", false);
    context.commit("qualityMeasures/resetGroupedMeasuresThresholds", null, {
      root: true
    });

    router.push("/fmodel-manager");
  },

  changeContext(context, data) {
    try {
      let features = runContextAnalysis(data, state.featureModel);
      console.log("STORE", features);

      features.map(feature => {
        context.commit("changeFeatureStatus", feature);
      });

      context.commit("setHasChanged", true);
    } catch (error) {
      context.commit("setError", error);
    }
  },

  saveFeatureModelOnDatabase: async context => {
    context.commit("setHasChanged", false);
  }
};

const getters = {
  getError: state => state.error,
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
