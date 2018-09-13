<template lang="html">
  <div class="content">
    <header>
      <h1>DyMMer Web 2.0</h1>
    </header>
    <tree></tree>
  </div>
</template>

<script>
import Tree from './Tree.vue'

export default {
  components: {
    Tree
  }
}
</script>

<style lang="css">
  header {
    text-align: center;
  }
</style>
