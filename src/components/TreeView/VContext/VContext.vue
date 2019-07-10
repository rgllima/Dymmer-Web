<template>
  <div v-show="showContext" :style="menuStyle">
    <ul class="list-unstyled">
      <li v-for="(item, index) in contextItems" :key="index" @click="action(item.title)">
        <span>
          <i :class="item.icon"></i>
        </span>
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["treeTypes", "contextItems", "mouseEvent", "clickedOutside"],

  data() {
    return {
      showContext: true,
      menuStyle: null
    };
  },

  methods: {
    closeMenu() {
      this.showContext = false;
    },
    action(title) {
      this.$emit("contextSelected", title);
    }
  },

  watch: {
    clickedOutside() {
      if (this.clickedOutside) this.showContext = false;
    },

    mouseEvent() {
      this.showContext = false;
      if (this.mouseEvent.button === 2) {
        this.menuStyle = {
          left: this.mouseEvent.pageX + "px",
          top: this.mouseEvent.pageY + "px",
          border: "1px solid #ddd",
          position: "absolute",
          "border-radius": "5px",
          "background-color": "#fff",
          "box-shadow": "2px 2px 2px #aaa",
          "z-index": 20
        };
        this.$nextTick(() => {
          this.showContext = true;
        });
      }
    }
  }
};
</script>

<style scoped>
ul {
  display: block;
  margin: 0;
}

ul li {
  list-style: none;
  cursor: pointer;
  padding: 5px 10px;
}

li:hover {
  background: rgba(83, 215, 220, 0.3);
}
</style>
