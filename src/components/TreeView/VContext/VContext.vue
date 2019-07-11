<template>
  <div v-show="showContext" :style="menuStyle">
    <div v-show="!showOption">
      <ul class="list-unstyled">
        <li v-if="toolboxContent.parent" @mousedown="openOptions('parent')">
          <span class="icon">
            <i class="fas fa-caret-up"></i>
          </span>
          <span>Create Sibling Feature</span>
        </li>
        <li @mousedown="openOptions('node')">
          <span class="icon">
            <i class="fas fa-caret-down"></i>
          </span>
          <span>Create Child Feature</span>
        </li>
        <li @click="action('Rename')">
          <span class="icon">
            <i class="fas fa-edit"></i>
          </span>
          <span>Rename</span>
        </li>
        <li class="is-danger" @click="action('Remove')">
          <span class="icon">
            <i class="fas fa-trash-alt"></i>
          </span>
          <span>Remove</span>
        </li>
      </ul>
    </div>

    <div v-show="showOption">
      <ul class="options">
        <li @click="showOption = false">
          <span class="icon">
            <i class="fas fa-caret-left"></i>
          </span>
          <span>Back</span>
        </li>
        <li v-for="(item, index) in data" :key="index" @click="action(item.title)">
          <span class="icon">
            <i :class="item.icon"></i>
          </span>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["treeTypes", "toolboxContent", "mouseEvent", "clickedOutside"],

  data() {
    return {
      data: [],
      whoisNode: "node",
      showContext: true,
      showOption: false,
      menuStyle: null
    };
  },

  methods: {
    closeMenu() {
      this.showOption = false;
      this.showContext = false;
    },
    action(title) {
      this.$emit("contextSelected", { title: title, whois: this.whoisNode });
      this.closeMenu();
    },
    openOptions(whois) {
      this.data = this.toolboxContent[`${whois}`];
      this.whoisNode = whois;
      this.$nextTick(() => {
        this.showOption = true;
      });
    }
  },

  watch: {
    // showOption() {
    //   console.log("ShowOption: ", this.showOption);
    // },

    clickedOutside() {
      if (this.clickedOutside) {
        this.showContext = false;
        // console.log("Clicou fora");
      }
    },

    mouseEvent() {
      // let mouseButton = this.mouseEvent.button;
      if (this.mouseEvent.button === 2) {
        this.menuStyle = {
          width: "210px",
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
          this.showOption = false;
        });
      }
      // else if (mouseButton === 0 && this.showOption) {
      //   return;
      // }
      // console.log("Vou fechar aqui", mouseButton, this.showOption);
      // this.showContext = false;
    }
  },

  mounted() {
    this.data = this.toolboxContent.node;
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

.is-danger:hover {
  background: #ffb6b6;
}

.icon {
  max-width: 30px;
}

span i {
  font-size: 1rem;
  margin-right: 5px;
  margin: 0 auto;
}

/* .options {
  position: absolute;
}

.options::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  right: -5px;
  top: 68px;
  border-top: 12px solid transparent;
  border-bottom: 0px solid white;
  border-left: 12px solid white;
  -webkit-box-shadow: -2px 2px 2px 0px rgba(black, 0.25);
  -moz-box-shadow: -2px 2px 2px 0px rgba(black, 0.25);
  box-shadow: -2px 2px 2px 0px rgba(black, 0.25);
  transform: rotate(50deg);
  -moz-transform: rotate(50deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -webkit-transform: rotate(225deg);
} */
</style>
