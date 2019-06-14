<template>
  <div :class="`context-card ${isActive ? 'context-card__active': ''}`" @click="selectContext">
    <div class="context-card-title">
      <p>{{title}}</p>
    </div>
    <div class="context-card-buttons" @click="showActions">
      <i class="fas fa-ellipsis-v"></i>
    </div>
    <div v-if="visibleActions" class="context-card-actions">
      <button class="context-card-action green" @click="renameContext">RENAME</button>
      <button class="context-card-action danger" @click="deleteContext">DELETE</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { active: { type: Boolean, default: false }, title: String },
  data: () => ({
    visibleActions: false
  }),
  mounted() {
    // console.log(this.active);
  },

  computed: {
    isActive: function() {
      // console.log("Opa");
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

    renameContext() {
      this.visibleActions = false;
    },

    deleteContext() {
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
