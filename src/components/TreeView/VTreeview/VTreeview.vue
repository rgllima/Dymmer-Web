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
        ref="vcontext"
        :clickedOutside="clickedOutside"
        :toolboxContent="toolboxContent"
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
      parentNode: null,
      toolboxContent: {},
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
          valid_children: ["m", "o", "g"]
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
      this.parentNode = this.selectedNode.$parent;
      this.toolboxContent = {};

      let typeRule = this.getTypeRule(this.selectedNode.model.type);
      let parentTypeRule = null;

      if (this.parentNode.model)
        parentTypeRule = this.getTypeRule(this.parentNode.model.type);

      this.toolboxContent["node"] = this.getValidChildren(typeRule);
      this.toolboxContent["parent"] = this.getValidChildren(parentTypeRule);
    },

    getValidChildren(rule) {
      if (!rule) return null;

      let items = [];
      rule.valid_children.map(function(type, key) {
        var childType = this.getTypeRule(type);
        var item = {
          title: "Create " + childType.name,
          icon: childType.icon,
          type: childType
        };
        items.push(item);
      }, this);
      return items;
    },

    contextSelected(data) {
      let node;
      if (data.whois === "node") node = this.selectedNode;
      else node = this.parentNode;

      let command = data.title;

      switch (command) {
        case "Create Mandatory":
          var newNode = {
            name: "New Mandatory Feature",
            type: "m",
            children: []
          };
          console.log("CREATE MANDATORY");
          node.addNode(newNode);
          break;
        case "Create Optional":
          var newNode = {
            name: "New Optional Feature",
            type: "o",
            children: []
          };
          node.addNode(newNode);
          break;
        case "Rename":
          console.log("rename");
          this.selectedNode.editName();
          console.log(this.selectedNode);
          break;
        case "Remove":
          this.$emit("removeNode", this.selectedNode.model.id);
          break;
      }
    },

    openTree(node) {
      this.$emit("openTree", node);
    },

    mousedown(e) {
      // console.log("pageX", e.pageX);
      // console.log("pageY", e.pageY);
      // console.log("clientX", e.clientX);
      // console.log("clientY", e.clientY);
      // console.log("layerX", e.layerX);
      // console.log("layerY", e.layerY);
      // console.log("offsetX", e.offsetX);
      // console.log("offsetY", e.offsetY);

      if (this.toolboxContent) {
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
      let vtreeview = this.$refs.vtreeview;
      let vcontext = this.$refs.vcontext;
      let target = e.target;

      let vctxClickResult = vcontext.$el.contains(target);
      let vtreeClickResult = vtreeview[0].$el.contains(target);

      console.log("CTX: ", vctxClickResult, "TREE: ", vtreeClickResult);

      // if (!vctxClickResult)
      this.$nextTick(() => {
        this.clickedOutside = !vctxClickResult;
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
