import Vue from "vue";
import Router from "vue-router";
// import VueCookies from 'vue-cookies'

Vue.use(Router);
// Vue.use(VueCookies)

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
        }
      ]
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const tokenExists = window.$cookies.isKey('USERTOKEN')
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   if (requiresAuth && !tokenExists) next('/dashboard')
//   else if (!requiresAuth && tokenExists) next('/')
//   else next()
// })

export default router;