<template>
  <b-modal
    :active.sync="modalActive"
    has-modal-card
    full-screen
    :can-cancel="false"
  >
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-centered">Adaptation Mechanism</p>
      </header>
      <section class="modal-card-body">
        <div v-if="converting">
          <b-loading :is-full-page="false" :active="converting">
            <b-icon
              pack="fas"
              icon="sync-alt"
              size="is-large"
              custom-class="fa-spin"
            />
          </b-loading>
          <p class="has-text-centered title">Convertendo Modelo de Features!</p>
          <p class="has-text-centered subtitle">Aguarde...</p>
          {{ featureTree }}
        </div>

        <div v-else class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child is-vertical box modal-card__left">
              <p class="subtitle has-text-centered">Feature Model</p>

              <!--              <article v-for="(feature, index) in featureList" :key="index">-->
              <!--                <b-checkbox-->
              <!--                  :id="`checkbox-${feature.id}`"-->
              <!--                  :native-value="feature"-->
              <!--                  v-model="selectedFeatures"-->
              <!--                >-->
              <!--                  <p>-->
              <!--                    <i :class="getIcon(feature.type)"></i>-->
              <!--                    {{ feature.name }}-->
              <!--                  </p>-->
              <!--                </b-checkbox>-->
              <!--              </article>-->
            </div>
            <!--            <div class="modal-card__button-middle">-->
            <!--              <button class="button is-success">-->
            <!--                <i class="fas fa-arrow-right"></i>-->
            <!--              </button>-->
            <!--            </div>-->
            <div class="tile is-child is-vertical box modal-card__left">
              <p class="subtitle has-text-centered">Cross-Tree Constraints</p>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" type="button" @click="$emit('close')">
          Cancel
        </button>
        <button class="button is-success">
          Save and Close
        </button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "AdaptationMechanism",
  props: {
    modalActive: {
      type: Boolean,
      default: false
    },
    featureTree: {
      type: Array,
      required: true
    },
    constraints: {
      type: Array,
      default: Array.of([])
    }
  },
  data() {
    return {
      converting: true
    };
  },

  methods: {
    startConversion() {
      let fModel = this.parseFeatureModel(this.featureTree[0]);

      fModel = this.mapGroupedConstraints(fModel);

      console.log(fModel);
      // TODO, por fim, limpar depedências duplicadas nos estados
      this.converting = false;
    },

    // 1st Phase - Parse Feature Model
    parseFeatureModel(feature) {
      let newFeature = this.buildDefaultObject(
        feature.id,
        feature.type,
        feature.name
      );

      let children = feature.children;
      newFeature.aggregator = !!children.length;

      if (children.length && children[0].type === "g") {
        newFeature.multiplicity = children[0].multiplicity;
        children = children[0].children;
      }

      for (const child of children) {
        newFeature.children.push(this.parseFeatureModel(child));
      }

      return newFeature;
    },

    // 2nd Phase - Map Grouped Constraints
    mapGroupedConstraints(feature) {
      if (feature.multiplicity === "1,1") {
        const leaves = this.getLeaves(feature);
        feature = this.searchAndSetRelatedLeaves(feature, leaves);
      }

      for (let child of feature.children) {
        child = { ...child, ...this.mapGroupedConstraints(child) };
      }

      return feature;
    },

    getLeaves(feature) {
      let leaves = [];

      for (const child of feature.children) {
        if (!child.aggregator) leaves.push(child);
        leaves = [...leaves, ...this.getLeaves(child)];
      }

      return leaves;
    },

    searchAndSetRelatedLeaves(feature, relatedLeaves = []) {
      if (!feature.aggregator) {
        let filtered = relatedLeaves.filter(({ id }) => id !== feature.id);
        for (const req of filtered) {
          for (const state of feature.states) {
            if (state.name === "On") {
              state.requires.push({
                address: req.id,
                value: false
              });
            }
          }
        }
      }

      for (let child of feature.children) {
        child = {
          ...child,
          ...this.searchAndSetRelatedLeaves(child, relatedLeaves)
        };
      }

      return feature;
    },

    buildDefaultObject(id, type, name) {
      return {
        id,
        type,
        name,
        aggregator: false,
        multiplicity: null,
        value: false,
        states: [
          {
            name: "Off",
            value: false,
            requires: []
          },
          {
            name: "On",
            value: true,
            requires: []
          }
        ],
        children: []
      };
    }
  },

  mounted() {
    this.startConversion();
  }
};
</script>

<style scoped></style>
