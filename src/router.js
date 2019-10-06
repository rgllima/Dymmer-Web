import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: () => import("@/views/HomePage/HomePage")
    },
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
      children: [
        {
          path: "/home",
          name: "Home",
          component: () => import("@/views/Dashboard/Home/Home")
        },
        {
          path: "/feature-model-list",
          name: "FModelList",
          component: () => import("@/views/Dashboard/FModelList/FModelList")
        },
        {
          path: "/fmodel-manager",
          name: "FModelManager",
          component: () => import("@/views/Dashboard/FModelManager/Index")
        },
        {
          path: "/measures-dataset",
          name: "MeasuresDataset",
          component: () =>
            import("@/views/Dashboard/MeasuresDataset/MeasuresDataset")
        },
        {
          path: "/help",
          name: "Help",
          component: () => import("@/views/Dashboard/Help/Help")
        }
      ]
    }
  ]
});

export default router;
