<template>
  <div :class="`context-card ${isActive ? 'context-card__active': ''}`" @click="selectContext">
    <div v-if="!isEditing" class="context-card-title" @dblclick="renameContext(title)">
      <p>{{title}}</p>
    </div>
    <div v-else class="context-card-title">
      <input
        class="input"
        type="text"
        ref="input"
        v-model="contextTitle"
        @blur="isEditing = false"
        @keyup.enter="saveNewContextName"
      />
    </div>
    <div class="context-card-buttons" @click="showActions">
      <i class="fas fa-ellipsis-v"></i>
    </div>
    <div v-if="visibleActions" class="context-card-actions">
      <button class="context-card-action green" @click="renameContext(title)">RENAME</button>
      <button class="context-card-action danger" @click="showDeleteContextAlert">DELETE</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { active: { type: Boolean, default: false }, title: String },
  data: () => ({
    visibleActions: false,
    contextTitle: "",
    isEditing: false
  }),
  mounted() {
    // console.log(this.active);
  },

  computed: {
    isActive: function() {
      return this.active;
    }
  },

  methods: {
    showActions() {
      this.visibleActions = true;
    },

    closeActions(e) {
      if (!this.$el.contains(e.target)) {
        this.visibleActions = false;
      }
    },

    renameContext(context) {
      this.visibleActions = false;
      this.isEditing = true;
      this.contextTitle = context;

      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    saveNewContextName() {
      this.$emit("saveNewContextName", this.contextTitle);
      this.isEditing = false;
    },

    showDeleteContextAlert() {
      this.$dialog.confirm({
        title: "Confirm deletion",
        message: "Do you really want to exclude this context?",
        type: "is-danger",
        cancelText: "Cancel",
        confirmText: "Delete",
        onConfirm: () => this.deleteContext()
      });
    },

    deleteContext() {
      this.$toast.open(`${this.title} context deleted!`);
      this.$emit("deleteContext");
      this.visibleActions = false;
    },

    selectContext() {
      this.$emit("selectContext", this.title);
    }
  },

  created() {
    window.addEventListener("click", this.closeActions);
  },

  beforeDestroy() {
    window.removeEventListener("click", this.closeActions);
  }
};
</script>

<style lang="sass">
.context-card
  position: relative
  background: #f0f8ff
  border-radius: 4px
  padding: 4px
  min-width: 130px
  min-height: 40px
  display: flex
  justify-content: space-between
  &__active
    background: #333366
    color: white
  &-title
    width: 90%
    overflow-wrap: break-word
    align-self: center
  &-buttons
    width: 5%
    align-self: center
  &-actions
    position: absolute
    right: -75px
    top: -4px
    width: 80px
    background: #f5f5dc
    border-radius: 4px
    z-index: 100
    text-align: center
  &-action
    background: transparent
    color: white
    border: none
    width: 100%
    cursor: pointer
.danger
  color: #ff4444
  &:hover
    color: #cc0000
.green
  color: #008000
  &:hover
    color: #065535
</style>
