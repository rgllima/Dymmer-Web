<template lang="html">
  <div class="homepage-content">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <div class="tile is-parent" style="background-color: rgb(218, 223, 225)">
          <div style="width: 100%">
               <nav class="navbar" style="background-color: transparent">
                <div class="navbar-brand">
                  <a class="navbar-item" @click="pushRouter('/home')">
                    <h1 class="is-size-4">DyMMer Dashboard</h1>
                  </a>
                  <div class="navbar-burger burger" data-target="navMenu" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div id="navMenu" class="navbar-menu" :class="{ 'is-active': showNav }">
                  <!-- <div class="navbar-start">
                    <a class="navbar-item has-text-white" @click="pushRouter('/project')">
                      The Project
                    </a>
                    <a class="navbar-item has-text-white" @click="pushRouter('/docs')">
                      Documentation
                    </a>
                    <a class="navbar-item has-text-white" @click="pushRouter('/developers')">
                      Developers
                    </a>
                  </div> -->

                  <!-- <div class="navbar-end">
                    <div class="navbar-item">
                      <div class="field is-grouped">
                        <p class="control">
                          <a class="button is-light is-outlined" @click="pushRouter('/dashboard')">
                            <span class="icon">
                              <i class="fas fa-tachometer-alt"></i>
                            </span>
                            <span>
                              Dashboard
                            </span>
                          </a>
                        </p>
                        <p class="control">
                          <a class="button is-light is-outlined" target="_blank" href="https://github.com/dymmerufc">
                            <span class="icon">
                              <i class="fab fa-github"></i>
                            </span>
                            <span>Colaborate</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div> -->
                </div>
              </nav>
          </div>
        </div>

        <div class="tile">
          <div class="tile is-vertical notification is-3" style="width: 250px !important;">
            <nav>
              <aside class="menu">
                <p class="menu-label">
                  General
                </p>
                <ul class="menu-list">
                  <li><a class="is-active">Home</a></li>
                  <li><a>Customers</a></li>
                </ul>
                <p class="menu-label">
                  Feature Model
                </p>
                <ul class="menu-list">
                  <li><a>Create</a></li>
                  <li><a>Import</a></li>
                </ul>
                <p class="menu-label">
                  Quality Measures
                </p>
                <ul class="menu-list">
                  <li><a>Apply</a></li>
                </ul>
              </aside>
            </nav>
          </div>
          <div class="tile is-parent is-vertical">
            <!-- <tree></tree> -->
            <router-view/>
          </div>

        </div>

      </div>
    </div>

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
      showNav: false
    };
  },
  methods: {
    pushRouter(route) {
      this.$router.push(route);
    }
  },
  mounted() {
    this.$router.push("/home");
  }
};
</script>

<style lang="css">
a {
  text-decoration: none !important;
}
.is-active {
  background-color: #7957d5;
  color: white !important;
  text-decoration: none !important;
}
.notification {
  border-radius: 0;
}
</style>
