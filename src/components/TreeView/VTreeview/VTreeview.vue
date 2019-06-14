<template>
  <div @mouseup.prevent="mousedown">
    <ul>
      <v-treeview-item
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
    <v-context
      v-if="hasToolbox"
      :show="showContext"
      :contextItems="contextItems"
      :mouseEvent="mouseEvent"
      @contextSelected="contextSelected"
    ></v-context>
  </div>
</template>

<script>
import VTreeviewItem from "./VTreeviewItem.vue";
import VContext from "../VContext/VContext.vue";

export default {
  props: ["value", "openAll", "editName", "searchText", "hasToolbox", "contextResolutions", "contextInEdition"],
  name: "v-treeview",
  data() {
    return {
      showContext: false,
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
          valid_children: ["m", "o"]
        },
        {
          type: "o",
          name: "Optional",
          icon: "far fa-circle",
          valid_children: ["o"]
        },
        {
          type: "g",
          name: "Grouped",
          icon: "fas fa-layer-group",
          valid_children: [""]
        },
        {
          type: "",
          icon: "fas fa-stop",
          valid_children: []
        }
      ]
    };
  },
  methods: {
    changeStatus(feature){
      this.$emit("changeFeatureStatus", feature)
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
      if (this.contextItems) {
        e.preventDefault();
        this.mouseEvent = {
          button: e.button,
          pageX: e.clientX,
          pageY: e.clientY
        };
      }
    }
  },
  components: {
    VContext,
    VTreeviewItem
  }
};
</script>

<style scoped>
ul {
  position: relative;
}
</style>
