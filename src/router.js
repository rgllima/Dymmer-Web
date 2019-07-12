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
        }
      ]
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const tokenExists = window.$cookies.isKey("USERTOKEN");
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !tokenExists)
//     next("/");
//   else {
//     if (to.path === '/dashboard')
//       next('/home')
//     else
//       next();
//   }
// });

export default router;
