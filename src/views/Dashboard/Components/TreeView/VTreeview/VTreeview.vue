<template>
  <!-- <div @mouseup.prevent="mousedown"> -->
  <div class="vtreeview-component" @mouseup.prevent="mousedown" @contextmenu.capture.prevent>
    <ul>
      <v-treeview-item
        ref="vtreeview"
        class="v-treeview-item"
        v-for="item in value"
        :key="item.id"
        :feature="item"
        :father_id="null"
        :treeRules="treeRules"
        :openAll="openAll"
        :searchText="searchText"
        :contextResolutions="contextResolutions"
        :contextInEdition="contextInEdition"
        @emitAddNode="addNode"
        @emitEditName="editName"
        @changeStatus="changeStatus"
        @selected="selected"
        @openTree="openTree"
      ></v-treeview-item>
    </ul>

    <editor-toolbox
      v-if="editorToolbox"
      ref="vcontext"
      :clickedOutside="clickedOutside"
      :toolboxContent="toolboxContent"
      :mouseEvent="mouseEvent"
      @contextSelected="contextSelected"
    ></editor-toolbox>

  </div>
</template>

<script>
import VTreeviewItem from "./VTreeviewItem.vue";
import EditorToolbox from "../ToolBox/EditorToolbox";

export default {
  props: {
    value: Array,
    openAll: Boolean,
    searchText: String,
    contextToolbox: { type: Boolean, default: false },
    editorToolbox: { type: Boolean, default: false },
    contextResolutions: Array,
    contextInEdition: Boolean
  },
  components: {
    VTreeviewItem,
    "editor-toolbox": EditorToolbox
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
          valid_children: ["r", "m", "o", "g", "g0", "g1", ""]
        },
        {
          type: "r",
          name: "Root",
          icon: "fas fa-paste",
          valid_children: ["m", "o", "g0", "g1"]
        },
        {
          type: "m",
          name: "Mandatory",
          icon: "fas fa-circle",
          valid_children: ["m", "o", "g0", "g1"]
        },
        {
          type: "o",
          name: "Optional",
          icon: "far fa-circle",
          valid_children: ["m", "o", "g0", "g1"]
        },
        {
          type: "",
          name: "Grouped Child",
          icon: "fas fa-stop",
          valid_children: ["m", "o", "g0", "g1"]
        },
        {
          type: "g",
          name: "Grouped",
          icon: "fas fa-layer-group",
          valid_children: [""]
        },
        {
          type: "g0",
          name: "[1,1] Group",
          icon: "fas fa-layer-group",
          valid_children: []
        },
        {
          type: "g1",
          name: "[1,*] Group",
          icon: "fas fa-layer-group",
          valid_children: []
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
      this.toolboxContent["type"] = this.selectedNode.model.type;
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

      let newNode = {};
      newNode["id"] = null;
      newNode["children"] = [];
      // console.log("NODE Clicado: ", node);

      switch (command) {
        case "Create Mandatory":
          newNode["name"] = "New Mandatory Feature";
          newNode["type"] = "m";
          node.addNode(newNode);
          break;
        case "Create Optional":
          newNode["name"] = "New Optional Feature";
          newNode["type"] = "o";
          node.addNode(newNode);
          break;
        case "Create Grouped Child":
          newNode["name"] = "New Grouped Feature";
          newNode["type"] = "";
          node.addNode(newNode);
          break;
        case "Create [1,1] Group":
          newNode["name"] = "";
          newNode["multiplicity"] = "1,1";
          newNode["type"] = "g";
          this.$emit("addNode", { parent: node.model, node: newNode });
          break;
        case "Create [1,*] Group":
          newNode["name"] = "";
          newNode["multiplicity"] = "1,*";
          newNode["type"] = "g";
          this.$emit("addNode", { parent: node.model, node: newNode });
          break;
        case "swapType":
          this.$emit("swapType", this.selectedNode.model.id);
          break;
        case "Rename":
          this.selectedNode.editName();
          break;
        case "Remove":
          this.$emit("removeNode", this.selectedNode.model.id);
          break;
      }
    },

    addNode(nodes) {
      this.$emit("addNode", nodes);
    },

    editName(data) {
      this.$emit("editName", data);
    },

    openTree(node) {
      this.$emit("openTree", node);
    },

    mousedown(e) {
      // console.log(e);
      // console.log('Width do Dispositivo', e.view.window.innerWidth)
      // console.log("pageX", e.pageX);
      // console.log("pageY", e.pageY);
      // console.log("clientX", e.clientX);
      // console.log("clientY", e.clientY);
      // console.log("layerX", e.layerX);
      // console.log("layerY", e.layerY);
      // console.log("offsetX", e.offsetX);
      // console.log("offsetY", e.offsetY);
      // console.log("Mouse Click");

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
      this.clickedOutside = false;
      let vcontext = this.$refs.vcontext;
      let target = e.target;

      let vctxClickResult = vcontext.$el.contains(target);

      this.$nextTick(() => {
        this.clickedOutside = !vctxClickResult;
        // console.log(this.clickedOutside, vcontext.showContext);
      });
    }
  },

  created() {
    if (!this.editorToolbox) return;
    else window.addEventListener("mousedown", this.hiddenToolbox);
  },

  beforeDestroy() {
    if (!this.editorToolbox) return;
    else window.removeEventListener("mousedown", this.hiddenToolbox);
  }
};
</script>

<style scoped>
.vtreeview-component {
  position: relative;
}

ul {
  position: relative;
}
</style>
