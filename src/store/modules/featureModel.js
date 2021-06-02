import router from "@/router";
import { runContextAnalysis } from "@/core/manageContextChanges.js";
import {
  getFeatureReference,
  getFeatureParentReference,
  getLastFeatureId
} from "@/core/featureModel.js";

import instance from "@/store/modules/axios.config";

const state = {
  hasChanged: false,
  nextId: 1,
  error: false,
  featureModel: {
    feature_tree: [],
    constraints: [],
    contexts: [],
    fm_context_agents: [],
    agents: {
      list: [],
      index: 0
    }
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

  setFmContextAgents: (state, payload) => {
    state.featureModel.fm_context_agents = payload;
    state.hasChanged = true;
  },

  setAgents: (state, { list, index }) => {
    state.featureModel.agents = { list, index };
    state.hasChanged = true;
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
  },

  swapFeatureType(state, payload) {
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
    let node = getFeatureReference(payload.id, state.featureModel.feature_tree);

    if (node["name"] !== payload["name"]) {
      node["name"] = payload["name"];
      state.hasChanged = true;
    }
  },

  deleteFeature(state, payload) {
    let feature_tree = state.featureModel.feature_tree;
    if (payload === feature_tree[0].id) return;

    let parent = getFeatureParentReference(payload, feature_tree[0]);
    parent.children = parent.children.filter(node => {
      return node.id !== payload;
    });

    state.hasChanged = true;
  },

  addContext(state, payload) {
    state.featureModel.contexts.push(payload);
    if (state.featureModel.type === "SPL") state.featureModel.type = "DSPL";
    state.hasChanged = true;
  },

  deleteContext(state) {
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
    state.featureModel.contexts.map(context => {
      if (context.isTheCurrent) {
        context.name = payload;
        state.hasChanged = true;
      }
    });
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
  },

  discardContextFeature(state, payload) {
    state.featureModel.contexts.map(context => {
      if (context.isTheCurrent)
        context.resolutions = context.resolutions.filter(
          feature => feature.feature_id !== payload.id
        );
    });
  },

  saveConstraints(state, payload) {
    state.featureModel.constraints = payload;
    state.hasChanged = true;
  }
};

const actions = {
  convertXmlToJson: async (context, xmlString) => {
    let url = `/xml/xml-to-json`;
    await instance
      .post(url, {
        xmlString: xmlString
      })
      .then(res => {
        let fModel = res.data;
        fModel["allowEdit"] = true;
        fModel["public"] = false;

        context.commit("setFeatureModel", fModel);
        context.commit("setHasChanged", true);
        context.commit("qualityMeasures/resetGroupedMeasuresThresholds", null, {
          root: true
        });

        router.push("/fmodel-manager");
      });
  },

  exportFMToXML: async (context, payload) => {
    let url = `/featuremodels/export-to-xml`;
    await instance
      .post(url, {
        featureModel: state.featureModel,
        withContexts: payload
      })
      .then(res => {
        let blob = new Blob([res.data], { type: "text/xml" });
        let url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${state.featureModel.name}.xml`); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
  },

  // Move this to "Mutations"
  showFeatureModel: async (context, data) => {
    context.commit("setFeatureModel", data);
    context.commit("setHasChanged", false);
    context.commit("qualityMeasures/resetGroupedMeasuresThresholds", null, {
      root: true
    });
    router.push(`/fmodel-manager/${data["_id"]}`);
  },

  changeContext(context, data) {
    try {
      let features = runContextAnalysis(data, state.featureModel);

      if (typeof data.status == "boolean") {
        features.map(feature => {
          context.commit("changeFeatureStatus", feature);
        });
      } else {
        features.map(feature => {
          context.commit("discardContextFeature", feature);
        });
      }

      context.commit("setHasChanged", true);
    } catch (error) {
      context.commit("setError", error);
    }
  },

  createFeatureModelOnDatabase: async (context, payload) => {
    let url = `/featuremodels/create`;

    await instance
      .post(url, {
        allowEdit: true,
        public: false,
        featureModelJson: JSON.stringify(payload)
      })
      .then(res => {
        let fModel = JSON.parse(res.data.newFeatureModel.featureModelJson);
        fModel["_id"] = res.data.newFeatureModel["_id"];
        fModel["allowEdit"] = res.data.newFeatureModel["allowEdit"];
        fModel["public"] = res.data.newFeatureModel["public"];
        fModel["user"] = res.data.newFeatureModel["user"];

        context.commit("setFeatureModel", fModel);
        context.commit("setHasChanged", false);
        context.commit("qualityMeasures/resetGroupedMeasuresThresholds", null, {
          root: true
        });
        router.push(`/fmodel-manager/${fModel["_id"]}`);
      });
  },

  updateFeatureModelOnDatabase: async context => {
    let fModel = state.featureModel;

    if (!fModel["_id"]) {
      let type = "SPL";
      if (fModel.contexts.length) {
        type = "DSPL";
      }
      await context.dispatch("createFeatureModelOnDatabase", {
        ...fModel,
        type: type
      });
    } else {
      let url = `/featuremodels/update/${fModel["_id"]}`;
      await instance
        .put(url, { featureModelJson: JSON.stringify(fModel) })
        .then(res => {
          const { updatedFeatureModel } = res.data;
          let data = JSON.parse(res.data.updatedFeatureModel.featureModelJson);
          data["_id"] = updatedFeatureModel._id;
          data["allowEdit"] = updatedFeatureModel.allowEdit;
          data["public"] = updatedFeatureModel.public;
          context.commit("setFeatureModel", data);
          context.commit("setHasChanged", false);
        });
    }
  },

  fetchFeatureModelOnDatabase: async (context, payload) => {
    let url = `/featuremodels/get/${payload}`;
    await instance
      .get(url)
      .then(res => {
        const { returnedFeatureModel } = res.data;
        let data = JSON.parse(returnedFeatureModel.featureModelJson);
        data["_id"] = returnedFeatureModel._id;
        data["allowEdit"] = returnedFeatureModel.allowEdit;
        data["public"] = returnedFeatureModel.public;
        data["user"] = returnedFeatureModel.user;
        context.commit("setFeatureModel", data);
      })
      .catch(err => {
        console.log(err.message);
      });
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
