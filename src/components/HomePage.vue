<template lang="html">
  <div class="homepage-content">
    <div>
      <navbar></navbar>
    </div>

    <div>
      <tree></tree>
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
import Tree from './Tree.vue'
import Navbar from './Navbar/Navbar.vue'

export default {
  components: {
    Tree,
    Navbar
  }
}
</script>

<style lang="css">

</style>
