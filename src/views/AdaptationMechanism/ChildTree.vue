<template>
  <div class="child-tree">
    <div v-for="(feature, i) in tree" :key="i">
      <div class="is-flex w-100-p">
        <p class="separator">{{ generateSeparators() }}</p>

        <div
          class="box is-flex feature w-100-p"
          :class="{ active: feature.value }"
        >
          <h5>{{ feature.name }}</h5>
          <b-icon pack="fas" icon="power-off" size="is-small" />
        </div>
      </div>

      <ChildTree :tree="feature.children" :level="level + 1" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ChildTree",
  props: {
    tree: Array,
    level: Number
  },
  methods: {
    generateSeparators() {
      if (this.level === 1) return "";

      const array = new Array(this.level * 4);
      let separator = "";

      for (let i = 0; i < array.length; i++) {
        separator += "_";
      }

      return separator;
    }
  }
};
</script>

<style lang="scss" scoped>
.child-tree {
  h5,
  p {
    margin: 0;
  }

  .w-100-p {
    width: 100%;
  }

  .separator {
    margin-right: 5px;
  }

  .feature {
    justify-content: space-between;
    align-items: center;
    color: #ff6666;
    margin-bottom: 5px;
  }

  .active {
    .icon {
      color: #008000 !important;
    }
  }
}
</style>
