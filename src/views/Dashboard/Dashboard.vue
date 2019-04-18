<template>
  <div class="homepage-content">
    <section class="main-content columns" style="overflow: hidden;">
      <aside class="column is-paddingless" :class="{'active': menu_bars}">
        <div class="infobar">
          <h1 class="has-text-centered is-size-5" style="margin-top: 15px;">DyMMer Web</h1>
        </div>

        <div class="menu-bars" @click="menu_bars=!menu_bars">
          <i class="fa" :class="(!menu_bars) ? 'fa-bars' : 'fa-times'"/>
        </div>

        <div style="margin-top: 20px">
          <ul class="menu-list">
            <li>
              <a class="has-text-white" @click="pushRouter('/home')">
                <i class="fas fa-home"></i>
                Home
              </a>
            </li>
          </ul>

          <p class="menu-label has-text-light" style="margin: 20px 0px 5px 8px; font-size: 0.7rem">
            Feature Model
          </p>
          <ul class="menu-list">
            <li>
              <a class="has-text-white">
                <i class="fas fa-plus"></i>
                Create
              </a>
            </li>
            <li>
              <a class="has-text-white">
                <i class="fas fa-file-import"></i>
                Import
              </a>
            </li>
            <li>
              <a class="has-text-white">
                <i class="fas fa-wrench"></i>
                Apply Configurations
              </a>
            </li>
            <li>
              <a class="has-text-white">
                <i class="fas fa-table"></i>
                My Feature Models
              </a>
            </li>
            <li>
              <a class="has-text-white">
                <i class="fas fa-database"></i>
                Public Feature Models
              </a>
            </li>
          </ul>

          <p class="menu-label has-text-light" style="margin: 20px 0px 5px 8px; font-size: 0.7rem">
            Quality Measures
          </p>
          <ul class="menu-list">
            <li>
              <a class="has-text-white">
                <i class="fas fa-tasks"></i>
                Apply Measures
              </a>
            </li>
          </ul>

          <p class="menu-label has-text-light" style="margin: 20px 0px 5px 8px; font-size: 0.7rem">
            General
          </p>
          <ul class="menu-list">
            <li>
              <a class="has-text-white">
                <i class="fas fa-cog"></i>
                Account Settings
              </a>
            </li>
            <li>
              <a class="has-text-white">
                <i class="fas fa-question"></i>
                Help
              </a>
            </li>
            <li>
              <a class="has-text-white" @click="logout">
                <i class="fas fa-sign-out-alt"></i>
                Exit Dashboard
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div class="container section column">
        <div class="level">
          <div class="level-left" :class="{'menu-bar-opened': menu_bars}">
            <!-- <div class="level-item">
              <div class="user">
                <i class="fa fa-user"/>
              </div>
            </div> -->
          </div>
          <div class="level-right">
            <div class="control has-icons-right">
              <input class="input" type="text" placeholder="Buscar">
              <span class="icon is-right">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>

        <div class="dashboard-pages">
          <router-view/>
        </div>
      </div>
    </section>

    <footer class="footer has-background-black-bis">
      <div class="content has-text-centered">
        <p class="has-text-light">
          <strong class="has-text-light">DyMMer</strong> by <a href="https://www.quixada.ufc.br/">Universidade Federal do Ceará - Campus Quixadá</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Tree from "@/components/Tree.vue";

export default {
  components: {
    Tree
  },
  data() {
    return {
      // showNav: false,
      menu_bars: false,
    };
  },
  methods: {
    pushRouter(route) {
      this.$router.push(route);
      this.menu_bars=!this.menu_bars;
    },

    logout() {
      this.$store.dispatch("authentication/logout")
    }
  },
  mounted() {
    // this.$router.push("/home");
  }
};
</script>

<style lang="scss" scoped>
@import "./Dashboard";

a.has-text-white:hover {
    color: #1f1a2f !important;
}

.dashboard-pages {
  height: 100%;
  background-color: #362e5080;

  @include phone {
    background-color: white;
  }
}
</style>
