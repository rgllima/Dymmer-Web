<template>
  <div class="dashboard-content columns">
    <aside class="sidebar column is-paddingless" :class="{'active': menu_bars}">
      <div class="dashboard-content--sidebar">
        <div class="infobar">
          <h1 class="infobar-text has-text-centered is-size-5">DyMMer Web</h1>
        </div>

        <div class="menu-bars" @click="menu_bars=!menu_bars">
          <i class="fa" :class="(!menu_bars) ? 'fa-bars' : 'fa-times'" />
        </div>

        <div style="margin-top: 20px">
          <ul class="menu-list">
            <li>
              <a class="has-text-white" @click="pushRouter('/home')">
                <i class="fas fa-th-large"></i>
                Dashboard
              </a>
            </li>
          </ul>

          <p class="menu-label has-text-light">Feature Model</p>
          <ul class="menu-list">
            <li>
              <a class="has-text-white" @click="openAddFeatureModelModal">
                <i class="fas fa-th-large"></i>
                Add Feature Model
              </a>
            </li>
            <li>
              <a class="has-text-white" @click="pushRouter('/feature-model-list',{type:'public'})">
                <i class="fas fa-table"></i>
                Public Repository
              </a>
            </li>
            <li>
              <a class="has-text-white" @click="pushRouter('/feature-model-list', {type:'private'})">
                <i class="fas fa-database"></i>
                Private Repository
              </a>
            </li>
          </ul>

          <p class="menu-label has-text-light">General</p>
          <ul class="menu-list">
            <li>
              <a class="has-text-white" @click="pushRouter('/measures-dataset')">
                <i class="fas fa-database"></i>
                Measures Dataset
              </a>
            </li>
            <li>
              <a class="has-text-white" @click="pushRouter('/help')">
                <i class="fas fa-question"></i>
                Help
              </a>
            </li>
          </ul>

          <p class="menu-label has-text-light"></p>
          <ul class="menu-list">
            <li>
              <a class="has-text-white" @click="logout">
                <i class="fas fa-sign-out-alt"></i>
                Exit Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <div class="dashboard-pages column">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import FeatureModelModal from "./Components/AddFeatureModelModal";

export default {
  data() {
    return {
      menu_bars: false
    };
  },
  methods: {
    pushRouter(route, query) {
      this.$router.push({ path: route, query: query });
      this.menu_bars = !this.menu_bars;
    },

    openAddFeatureModelModal() {
      this.$modal.open({
        parent: this,
        component: FeatureModelModal,
        hasModalCard: true
      });
    },

    logout() {
      this.$store.dispatch("authentication/logout");
    }
  }
};
</script>

<style lang="scss">
@import "./Dashboard";
</style>
