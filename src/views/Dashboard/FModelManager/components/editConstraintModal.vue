<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title has-text-centered">Constraint Editor</p>
    </header>
    <section class="modal-card-body">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child is-vertical box modal-card__left">
            <p class="subtitle has-text-centered">Feature List</p>

            <article v-for="(feature, index) in featureList" :key="index">
              <b-checkbox :id="`checkbox-${feature.id}`" :native-value="feature" v-model="selectedFeatures">
                <p>
                  <i :class="getIcon(feature.type )"></i>
                  {{feature.name}}
                </p>
              </b-checkbox>
            </article>

          </div>
          <div class="modal-card__button-middle">
            <button class="button is-success" @click="addConstraint">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          <div class="tile is-child is-vertical box modal-card__left">
            <p class="subtitle has-text-centered">Cross-Tree Constraints</p>
            <ConstraintCard
              @changeConstraintValue="changeConstraintValue"
              @deleteConstraint="deleteConstraint"
              :isEditing="true"
              :constraints="myConstraints"
            />
          </div>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" type="button" @click="$parent.close()">Cancel</button>
      <button class="button is-success" @click="saveConstraints">Save and Close</button>
    </footer>
  </div>
</template>

<script>
import ConstraintCard from "./ConstraintCard";
export default {
  components: {
    ConstraintCard
  },
  props: ["constraints", "featureList"],
  data() {
    return {
      active: false,
      selectedFeatures: [],
      myConstraints: [],
      ctsIndex: 0
    };
  },

  methods: {
    getIcon(icon) {
      if (icon === "m") return "fas fa-circle";
      else if (icon === "o") return "far fa-circle";
      else if (icon === "") return "fas fa-stop";
    },

    addConstraint() {
      if (this.selectedFeatures.length <= 1) {
        this.showMessage(
          "Select at least two features in Feature List!",
          "is-danger"
        );
        return;
      }

      let list = [];
      this.selectedFeatures.map(feature => {
        list.push({ feature: feature.name, val: true, id: feature.id });
      });

      this.myConstraints.push({
        name: `constraint_${++this.ctsIndex}`,
        list: list
      });

      this.selectedFeatures = [];
    },

    async saveConstraints() {
      await this.$emit("saveConstraints", this.myConstraints);
      this.$parent.close();
    },

    changeConstraintValue(feature) {
      this.myConstraints.map(constraint => {
        if (constraint.name === feature.name) {
          constraint.list.map(ftr => {
            if (ftr.id === feature.id) ftr.val = feature.val;
          });
        }
      });
      this.myConstraints = [...this.myConstraints];
    },

    deleteConstraint(payload) {
      this.myConstraints = this.myConstraints.filter(constraint => {
        return constraint.name !== payload;
      });
    },

    searchConstraintIndex() {
      this.constraints.map(constraint => {
        let index = constraint.name.split("_")[1];
        if (index > this.ctsIndex) this.ctsIndex = index;
      });
    },

    showMessage(message, color) {
      this.$toast.open({
        message: message,
        type: color
      });
    }
  },

  mounted() {
    this.myConstraints = JSON.parse(JSON.stringify(this.constraints));
    this.searchConstraintIndex();
  }
};
</script>

<style lang="sass">
.modal-card
  &__sides
    min-height: 500px
    height: calc(100vh - 180px)
    overflow-x: hidden
    overflow-y: scroll
  &__left
    @extend .modal-card__sides
  &__button-middle
    padding: 0 10px
    display: flex
    align-items: center
  &__right
    @extend .modal-card__sides
  &-foot
    display: block
    text-align: right
.modal-card-body, .modal-card-foot
  .is-success
    background: #41a080
</style>