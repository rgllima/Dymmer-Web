import router from "@/router";
import axios from "axios";
import dymmerServer from "../../util/dymmer-server";
import { runContextAnalysis } from "@/core/manageContextChanges.js";
import {
  getFeatureReference,
  getFeatureParentReference,
  getLastFeatureId
} from "@/core/featureModel.js";

const state = {
  hasChanged: false,
  nextId: 1,
  error: false,
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

  setError: (state, payload) => {
    state.error = payload;
  },

  setFeatureModel: (state, payload) => {
    state.featureModel = payload;
    state.nextId = getLastFeatureId(state.featureModel.feature_tree[0]);
  },

  addFeature(state, payload) {
    let node = getFeatureReference(
      payload.parent.id,
      state.featureModel.feature_tree
    );

    let index = (state.nextId += 1);
    payload.node["id"] = `${payload.parent.id}_${index}`;
    node.children.push(payload.node);
    state.featureModel.number_of_features++;
    state.hasChanged = true;
    console.log("[STORE] - AddFeature");
  },

  swapFeatureType(state, payload) {
    console.log("[STORE] - Swap Feature")
    let node = getFeatureReference(payload, state.featureModel.feature_tree);
    state.hasChanged = true;
    if (node["multiplicity"]) {
      if (node["multiplicity"] === "1,1") node["multiplicity"] = "1,*";
      else if (node["multiplicity"] === "1,*") node["multiplicity"] = "1,1";
      return;
    }
    if (node["type"] === "o") node["type"] = "m";
    else if (node["type"] === "m") node["type"] = "o";
  },

  renameFeature(state, payload) {
    console.log("[STORE] - RenameFeature")
    let node = getFeatureReference(payload.id, state.featureModel.feature_tree);

    if (node["name"] !== payload["name"]) {
      node["name"] = payload["name"];
      state.hasChanged = true;
    }
  },

  deleteFeature(state, payload) {
    console.log("[STORE] - DeleteFeature")
    let feature_tree = state.featureModel.feature_tree;
    if (payload === feature_tree[0].id) return;

    let parent = getFeatureParentReference(payload, feature_tree[0]);
    parent.children = parent.children.filter(node => {
      return node.id !== payload;
    });

    state.hasChanged = true;
  },

  addContext(state, payload) {
    console.log("[STORE] - AddContext")
    state.featureModel.contexts.push(payload);
    if (state.featureModel.type === "SPL") state.featureModel.type = "DSPL";
    state.hasChanged = true;
  },

  deleteContext(state) {
    console.log("[STORE] - DeleteContext")
    state.featureModel.contexts = state.featureModel.contexts.filter(
      context => {
        return !context.isTheCurrent;
      }
    );

    if (state.featureModel.contexts.length === 0)
      state.featureModel.type = "SPL";
    state.hasChanged = true;
  },

  renameContext(state, payload) {
    console.log("[STORE] - RenameFeature")
    state.featureModel.contexts.map(context => {
      if (context.isTheCurrent) {
        context.name = payload;
        state.hasChanged = true;
      }
    });
  },

  selectContext(state, payload) {
    console.log("[STORE] - SelectContext")
    state.featureModel.contexts.map(context => {
      if (context.name === payload) context["isTheCurrent"] = true;
      else context["isTheCurrent"] = false;
    });
  },

  changeFeatureStatus(state, payload) {
    console.log("[STORE] - Change FT Status")
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
  },

  discardContextFeature(state, payload) {
    console.log("[STORE] - Delete Feature from Context")
    state.featureModel.contexts.map(context => {
      if (context.isTheCurrent)
        context.resolutions = context.resolutions.filter(
          feature => feature.feature_id !== payload.id
        );
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
      console.log("Store:", data);

      if (typeof data.status == "boolean") {
        features.map(feature => {
          context.commit("changeFeatureStatus", feature);
        });
      } else {
        features.map(feature => {
          context.commit("discardContextFeature", feature);
        });
      }

      // console.log("Store FModel: ", JSON.stringify(state.featureModel.feature_tree));

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
