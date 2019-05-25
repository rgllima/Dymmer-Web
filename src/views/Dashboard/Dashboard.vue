<template>
  <div class="homepage-content">
    <section class="main-content columns" style="overflow: hidden;">
      <aside class="column is-paddingless" :class="{'active': menu_bars}">
        <div class="infobar">
          <h1 class="infobar-text has-text-centered is-size-5">DyMMer Web</h1>
        </div>

        <div class="toggle-icon">
          <i class="fas fa-chevron-circle-left"></i>
          <i class="fas fas-hidden fa-chevron-circle-right"></i>
        </div>

        <div class="menu-bars" @click="menu_bars=!menu_bars">
          <i class="fa" :class="(!menu_bars) ? 'fa-bars' : 'fa-times'"/>
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
              <a class="has-text-white" @click="pushRouter('feature-model-list')">
                <i class="fas fa-table"></i>
                SPL Repository
              </a>
            </li>
            <li>
              <a class="has-text-white" @click="pushRouter('feature-model-list')">
                <i class="fas fa-database"></i>
                DSPL Repository
              </a>
            </li>
            <li>
              <a class="has-text-white">
                <i class="fas fa-database"></i>
                Measures Dataset
              </a>
            </li>
          </ul>

          <!-- <p
            class="menu-label has-text-light"
            style="margin: 20px 0px 5px 8px; font-size: 0.7rem"
          >Quality Measures</p>
          <ul class="menu-list">
            <li>
              <a class="has-text-white">
                <i class="fas fa-tasks"></i>
                Apply Measures
              </a>
            </li>
          </ul>-->

          <p class="menu-label has-text-light">General</p>
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

      <div class="mycontainer section column">
        <div class="level">
          <div class="level-left" :class="{'menu-bar-opened': menu_bars}">
            <!-- <div class="level-item">
              <div class="user">
                <i class="fa fa-user"/>
              </div>
            </div>-->
          </div>
          <div class="level-right">
            <div class="control">
              <button class="button" @click="openAddFeatureModelModal">
                <i class="icon fas fa-plus"></i> Add Feature Model
              </button>
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
          <strong class="has-text-light">DyMMer</strong> by
          <a href="https://www.quixada.ufc.br/">Universidade Federal do Ceará - Campus Quixadá</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Tree from "@/components/Tree.vue";
import FeatureModelModal from './Components/AddFeatureModelModal'

export default {
  components: {
    Tree
  },
  data() {
    return {
      // showNav: false,
      menu_bars: false
    };
  },
  methods: {
    pushRouter(route) {
      this.$router.push(route);
      this.menu_bars = !this.menu_bars;
    },

    openAddFeatureModelModal() {
        this.$modal.open({
            parent: this,
            component: FeatureModelModal,
            hasModalCard: true
        })
    },

    logout() {
      this.$store.dispatch("authentication/logout");
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
  color: #372f9d !important;
}

.dashboard-pages {
  height: 100%;
  background-color: whitesmoke;

  @include phone {
    background-color: white;
  }
}
</style>
