import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/css/reset.css";

import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

import VTreeView from "@/views/Dashboard/Components/TreeView/VTreeview/VTreeview";
Vue.component("v-treeview", VTreeView);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
