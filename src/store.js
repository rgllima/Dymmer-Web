import Vuex from "vuex";
import Vue from "vue";

import authentication from "@/store/modules/authentication";
import featureModel from "@/store/modules/featureModel";
import loading from "@/store/modules/loading";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    authentication,
    featureModel,
    loading
  },
  strict: debug
});
