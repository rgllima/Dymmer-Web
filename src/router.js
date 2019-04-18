import Vue from "vue";
import Router from "vue-router";
import VueCookies from "vue-cookies";

Vue.use(Router);
Vue.use(VueCookies);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: () => import("@/views/HomePage/HomePage")
    },
    {
      path: "/project",
      name: "TheProject",
      component: () => import("@/views/TheProject/TheProject")
    },
    {
      path: "/docs",
      name: "Documentation",
      component: () => import("@/views/Documentation/Documentation")
    },
    {
      path: "/developers",
      name: "Developers",
      component: () => import("@/views/Developers/Developers")
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/Dashboard/Dashboard"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "/home",
          name: "Home",
          component: () => import("@/views/Dashboard/Childs/Home")
        },
        {
          path: "/show-feature-model",
          name: "ShowFeatureModel",
          component: () => import("@/views/Dashboard/Childs/ShowFeatureModel")
        },
        {
          path: "/measure-thresholds",
          name: "MeasureThresholds",
          component: () => import("@/views/Dashboard/Childs/MeasureThresholds")
        },
        {
          path: "/feature-model-list",
          name: "FeatureModelList",
          component: () => import("@/views/Dashboard/Childs/FeatureModelList")
        },
        {
          path: "/measures-shower",
          name: "CalculatedMeasureShower",
          component: () => import("@/views/Dashboard/Childs/CalculatedMeasureShower")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const tokenExists = window.$cookies.isKey("USERTOKEN");
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log(`Auth: ${requiresAuth} /`, `Has Token: ${tokenExists}`);

  if (requiresAuth && !tokenExists) {
    console.log("Quer entrar, mas não tem chave");
    next("/");
    // if (to.path === "/dashboard") {
    //   console.log("to.path 1", to.path);
    //   next();
    // } else {
    //   next("/dashboard");
    // }
    //  else {
    //   console.log("to.path 2", to.path);
    //   next();
    // }
  } else {
    console.log("Segue o jogo...");
    next();
  }
  //  else if (!requiresAuth || !tokenExists) {
  //   if (to.path !== "/") {
  //     console.log("to.path 3", to.path);
  //     next("/");
  //   } else {
  //     console.log("to.path 4", to.path);
  //     next();
  //   }
  // }

  // if (requiresAuth && tokenExists && to.path !== "/dashboard") next("/dashboard");
  // else if (!requiresAuth && !tokenExists && to.path !== "/") next("/");
  // else next();
});

export default router;
