<template>
  <li class="tree-node">
    <span class="toggle-icon" :class="{ 'empty-toggle': !isFolder }" :key="open">
      <i v-if="isFolder" :class="{'fas fa-caret-down' : this.open, 'fas fa-caret-right' : !this.open}" ></i>
    </span>

    <span class="tree-icon" :class="{ 'empty-toggle': !icon }" :key="icon">
      <i v-if="icon" class="far" :class="icon" ></i>
    </span>

    <span >
      <span v-if="contextStatus === 'activeItem'" class="edit-icon green">
        <i class="fas fa-check"></i>
      </span>

      <span v-if="contextStatus === 'desactiveItem'" class="edit-icon danger">
        <i class="fas fa-times"></i>
      </span>
    </span>

    <input type="radio" name="rad" v-model="checked" :id="model.id" :value="model.id">
    <label v-if="!(model.type == 'g')" v-show="!edit" class="tree-text" :class="contextStatus" :for="model.id" @click="toggle" @contextmenu.prevent="showContextMenu" key="label">{{model.name}}</label>
    <label v-else v-show="!edit" class="tree-text" :class="{ 'searched-text': isSearchText }" :for="model.id" @click="toggle" @contextmenu.prevent="showContextMenu" key="label">{{[new String(model.multiplicity)]}}</label>
    <input v-show="edit" ref="title" class="tree-text" v-model="model.name" :placeholder="model.name" key="input" @blur="blur" @keyup.enter="blur">

    <div class="tree-children">
      <ul v-show="open" v-if="isFolder">
        <v-treeview-item v-for="child in model.children" :key="child.id" :feature="child"
        :father="{id: model.id, type: model.type, multiplicity: model.multiplicity}"
        :treeRules="treeRules" :openAll="openAll" @emitAddNode="emitAddNode" @emitEditName="emitEditName"
        @selected="selected" :searchText="searchText" :contextResolutions="contextResolutions"
        @openTree="openTree">
        </v-treeview-item>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: 'v-treeview-item',
  props: ['feature', 'father', 'treeRules', 'openAll', 'searchText', 'contextResolutions'],
  data() {
    return {
      forbidenChangeTypes: ["r", "g", "m"],
      open: false,
      checked: null,
      edit: false,
      model: null
    }
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length
    },

    icon() {
      return this.getTypeRule(this.model.type).icon
    },

    isSearchText() {
      if (this.searchText && this.searchText != '') {
        if (
          this.model.name
            .toLowerCase()
            .indexOf(this.searchText.toLowerCase()) !== -1
        ) {
          this.openTree(this)
          return true
        } else return false
      }
    },

    contextStatus() {
      if (!this.contextResolutions || this.contextResolutions.length === 0)
        return ''
      if (this.model.id === '_r')
        return ''
      let context = this.contextResolutions.filter(resolution => (resolution.feature_id === this.model.id))[0]

      if (context)
        if (context.status) return 'activeItem'
        else return 'desactiveItem'
      return 'ignoredItem'
    },
  },
  methods: {
    getTypeRule(type) {
      var typeRule = this.treeRules.filter(t => t.type == type)[0]
      return typeRule
    },

    blur(e) {
      this.edit = false
      if (!this.model.id)
        this.$emit("emitAddNode", {parent: this.$parent.model, node: this.model})
      else this.$emit("emitEditName", {id: this.model.id, name: this.model.name})
    },

    emitAddNode(data) {
      this.$emit("emitAddNode", data)
    },

    emitEditName(data) {
      this.$emit("emitEditName", data)
    },

    selected(node) {
      this.checked = null
      this.checked = this.model.id
      this.$emit('selected', node)
    },

    openTree(node) {
      this.open = true
      this.$emit('openTree', node)
    },

    addNode(newNode) {
      var typeRule = this.getTypeRule(this.model.type)

      if (typeRule.valid_children.indexOf(newNode.type) > -1) {
        this.model.children.push(newNode)
      }
    },
    editName() {
      this.edit = true
      this.$nextTick(() => this.$refs.title.focus())
    },

    showContextMenu(e) {
      e.preventDefault()
      this.open = true
      this.selected(this)
    },
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
      this.selected(this)
    }
  },

  created() {
    this.model = this.feature;
    if (!this.model.id) {
      this.editName()
    }
    this.open = this.openAll
  },

  watch: {
    feature() {
      this.model = this.feature
      // console.log("Feature Mudou")
    },

    openAll(openAll) {
      this.open = openAll
    },
  },
}
</script>

<style scoped>
ul {
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
}
ul .tree-node {
  display: block;
  padding-left: 15px;
}
.toggle-icon {
  display: inline-block;
  width: 20px;
}

ul .tree-node :hover:before {
  background: rgba(129, 100, 207, 0.1);
}

ul .tree-node input[type='radio'] {
  display: none;
}
ul .tree-node input[type='radio']:checked + label:before {
  background: rgba(121, 87, 213, 0.25);
}

ul label {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
ul label:before {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  content: '';
  height: 21px;
  left: 0;
  position: absolute;
  right: 0;
}

.searched-text {
  font-style: italic;
  color: #cc0000;
}

.activeItem {
  background-color: #d3ffce;
  padding: 0 7px;
  border-radius: 10px;
}

.desactiveItem {
  background-color: #ffe4e1;
  padding: 0 7px;
  border-radius: 10px;
}

.ignoredItem {
  text-decoration: line-through;
  padding: 0 7px;
  border-radius: 10px;
}

.tree-icon {
  font-size: .8em;
  margin-right: 10px;
}

.edit-icon {
  font-size: .8em;
  margin-right: 10px;
}

.btn-icon {
  z-index: 1;
  position: relative;
}

.danger {
  color: #ff4444
}

.green {
  color: #008000
}

.blue {
  color: #0099cc
}
</style>
