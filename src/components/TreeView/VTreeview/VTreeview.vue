<template>
  <!-- <div @mouseup.prevent="mousedown"> -->
  <div @mouseup.prevent="mousedown" @contextmenu.capture.prevent>
    <ul>
      <v-treeview-item
        ref="vtreeview"
        class="v-treeview-item"
        v-for="item in value"
        :key="item.id"
        :model="item"
        :father_id="null"
        :treeRules="treeRules"
        :openAll="openAll"
        :searchText="searchText"
        :contextResolutions="contextResolutions"
        :contextInEdition="contextInEdition"
        @changeStatus="changeStatus"
        @selected="selected"
        @openTree="openTree"
      ></v-treeview-item>
    </ul>
    <div v-if="hasToolbox">
      <v-context
        :clickedOutside="clickedOutside"
        :contextItems="contextItems"
        :mouseEvent="mouseEvent"
        @contextSelected="contextSelected"
      ></v-context>
    </div>
  </div>
</template>

<script>
import VTreeviewItem from "./VTreeviewItem.vue";
import VContext from "../VContext/VContext.vue";

export default {
  props: [
    "value",
    "openAll",
    "editName",
    "searchText",
    "hasToolbox",
    "contextResolutions",
    "contextInEdition"
  ],
  components: {
    VContext,
    VTreeviewItem
  },
  name: "v-treeview",
  data() {
    return {
      clickedOutside: false,
      mouseEvent: null,
      selectedNode: null,
      contextItems: [],
      treeRules: [
        {
          type: "#",
          max_children: 6,
          max_depth: 4,
          valid_children: ["r", "m", "o", "g", ""]
        },
        {
          type: "r",
          name: "Root",
          icon: "fas fa-paste",
          valid_children: ["m", "o"]
        },
        {
          type: "m",
          name: "Mandatory",
          icon: "fas fa-circle",
          valid_children: ["m", "o", "g"]
        },
        {
          type: "o",
          name: "Optional",
          icon: "far fa-circle",
          valid_children: ["m","o", "g"]
        },
        {
          type: "g",
          name: "Grouped",
          icon: "fas fa-layer-group",
          valid_children: [""]
        },
        {
          type: "",
          name: "Grouped Child",
          icon: "fas fa-stop",
          valid_children: ["m", "o"]
        }
      ]
    };
  },

  methods: {
    changeStatus(feature) {
      this.$emit("changeFeatureStatus", feature);
    },

    getTypeRule(type) {
      var typeRule = this.treeRules.filter(t => t.type == type)[0];
      return typeRule;
    },

    selected(node) {
      this.selectedNode = node;
      this.contextItems = [];
      var typeRule = this.getTypeRule(this.selectedNode.model.type);
      typeRule.valid_children.map(function(type, key) {
        var childType = this.getTypeRule(type);
        var item = {
          title: "Create " + childType.name,
          icon: childType.icon,
          type: childType
        };
        this.contextItems.push(item);
      }, this);

      this.contextItems.push({ title: "Rename", icon: "far fa-edit" });
      this.contextItems.push({ title: "Remove", icon: "far fa-trash-alt" });
      this.contextItems.push({
        title: "Create Feature Above",
        icon: "fas fa-caret-up"
      }); //Rever
      this.contextItems.push({
        title: "Create Feature Below",
        icon: "fas fa-caret-down"
      }); //Rever
    },

    contextSelected(title) {
      let command = title;
      switch (command) {
        case "Create Mandatory":
          var node = {
            name: "New Mandatory Feature",
            type: "m",
            children: []
          };
          console.log("CREATE MANDATORY");
          this.selectedNode.addNode(node);
          break;
        case "Create Optional":
          var node = {
            name: "New Optional Feature",
            type: "o",
            children: []
          };
          this.selectedNode.addNode(node);
          break;
        case "Rename":
          console.log("rename");
          this.selectedNode.editName();
          break;
        case "Remove":
          break;
      }
    },

    openTree(node) {
      this.$emit("openTree", node);
    },

    mousedown(e) {
      console.log("pageX", e.pageX);
      console.log("pageY", e.pageY);
      console.log("clientX", e.clientX);
      console.log("clientY", e.clientY);
      console.log("layerX", e.layerX);
      console.log("layerY", e.layerY);
      console.log("offsetX", e.offsetX);
      console.log("offsetY", e.offsetY);

      if (this.contextItems) {
        e.preventDefault();
        this.mouseEvent = {
          button: e.button,
          pageX: e.layerX,
          pageY: e.layerY
        };
      }
    },

    hiddenToolbox(e) {
      this.clickedOutside = null;
      let el = this.$refs.vtreeview;
      let target = e.target;

      this.$nextTick(() => {
        this.clickedOutside = !el[0].$el.contains(target);
      });
    }
  },

  created() {
    window.addEventListener("click", this.hiddenToolbox);
  },

  beforeDestroy() {
    window.removeEventListener("click", this.hiddenToolbox);
  }
};
</script>

<style scoped>
ul {
  position: relative;
}
</style>
