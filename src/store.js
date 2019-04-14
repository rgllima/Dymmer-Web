import Vuex from "vuex";
import Vue from "vue";

import authentication from "@/store/modules/authentication";
import featureModel from "@/store/modules/featureModel";
import featureModelDatabase from "@/store/modules/featureModelDatabase";
import qualityMeasures from "@/store/modules/qualityMeasures";
import loading from "@/store/modules/loading";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    authentication,
    featureModel,
    featureModelDatabase,
    qualityMeasures,
    loading
  },
  strict: debug
});
