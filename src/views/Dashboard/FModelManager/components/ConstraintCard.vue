<template>
  <div class="constraint-card">
    <div class="constraint-card__content">

      <div v-if="constraints.length !== 0">
        <div class="constraint-card__list" v-for="(value, key) in constraints" :key="key">
          <div class="constraint-card__box">
            <i v-if="isEditing" class="fas fa-trash danger is-hoverable" @click="deleteConstraint(value.name)" ></i>
            <strong>{{key+1}}:</strong>
            <div class="constraint-card__feature" v-for="(feature, key2) in value.list" :key="key2">
              <i v-if="!feature.val" class="far fa-times-circle danger" @click="changeConstraintValue(value.name, feature.id, true)"></i>
              <i v-else class="far fa-check-circle green" @click="changeConstraintValue(value.name, feature.id, false)"></i>
              <p>{{feature.feature}}</p>
              <p v-if="value.list[key2+1]">
                <strong>{{` OR `}}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="has-text-centered" v-else>
        <p>No constraints</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["constraints", "isEditing"],

  methods: {
    deleteConstraint(name) {
      this.$emit("deleteConstraint", name);
    },

    changeConstraintValue(ctsName, id, value) {
      if (!this.isEditing) return;
      this.$emit("changeConstraintValue", { name: ctsName, id: id, val: value })
    }
  }
};
</script>

<style lang="sass">
.constraint-card
  &__content
    padding: 10px
  &__list
    position: relative
    i
      margin: 0 5px
      cursor: pointer
  &__box
    background: whitesmoke
    border-radius: 5px
    padding: 5px
    margin-bottom: 5px
  &__feature, p
    display: inline

.fa-trash
  cursor: pointer
</style>