import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueResource from "vue-resource";
// import "bulma";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VTreeView from "@/components/TreeView/VTreeview/VTreeview";

Vue.use(VueResource);
Vue.use(Buefy);

Vue.component("v-treeview", VTreeView);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
