<template>
  <div v-show="showContext" :style="menuStyle">
    <ul class="list-unstyled">
      <li class="is-green" @click="activeContextFeature">
        <span class="icon">
          <i class="fas fa-check"></i>
        </span>
        <span>Active Feature</span>
      </li>
      <li class="is-danger" v-if="node.model.type !== 'm'" @click="desactiveContextFeature">
        <span class="icon">
          <i class="fas fa-times"></i>
        </span>
        <span>Desactive Feature</span>
      </li>
      <li v-if="node.model.type !== 'm'" @click="discardContextFeature">
        <span class="icon">
          <i class="fas fa-trash-alt"></i>
        </span>
        <span>Remove from Context</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["node", "mouseEvent", "clickedOutside"],

  data() {
    return {
      typesForbiddenChanges: ["r", "g"],
      whoisNode: "node",
      showContext: false,
      menuStyle: null,
      multiplicity: null,
      feature: {}
    };
  },

  methods: {
    closeMenu() {
      this.showContext = false;
    },

    activeContextFeature() {
      this.createPayload(true);
      this.$emit("changeStatus", this.feature);
      this.closeMenu();
    },

    desactiveContextFeature() {
      this.createPayload(false);
      this.$emit("changeStatus", this.feature);
      this.closeMenu();
    },

    discardContextFeature() {
      this.createPayload(null);
      this.$emit("changeStatus", this.feature);
      this.closeMenu();
    },

    createPayload(status) {
      this.feature = {};
      this.feature["id"] = this.node.model["id"];
      this.feature["type"] = this.node.model["type"];
      this.feature["status"] = status;

      let father = {};
      father["id"] = this.node.parent.id;
      father["type"] = this.node.parent.type;
      father["multiplicity"] = this.node.parent.multiplicity;

      this.feature["father"] = father;
    }
  },

  watch: {
    async clickedOutside() {
      console.log("Cliquei fora")
      if (this.clickedOutside) {
        this.showContext = false;
      }
    },

    mouseEvent() {
      if (this.mouseEvent.button === 2) {
        if (this.typesForbiddenChanges.includes(this.node.model.type)) return;
        console.log("Conteúdo do Toolbox: ", this.node);
        this.multiplicity = this.node.parent.multiplicity;

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
        this.showContext = true;
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

.is-green:hover {
  background: #d3ffce;
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
