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
        </div>

        <div v-else class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child is-vertical box modal-card__left">
              <p class="subtitle has-text-centered">Feature Model</p>
              <child-tree :tree="model.feature_tree" :level="1" />
            </div>
            <!--            <div class="modal-card__button-middle">-->
            <!--              <button class="button is-success">-->
            <!--                <i class="fas fa-arrow-right"></i>-->
            <!--              </button>-->
            <!--            </div>-->
            <div class="tile is-child is-vertical box modal-card__left">
              <p class="subtitle has-text-centered">Context Agents</p>

              <div class="contexts">
                <div v-for="(agent, k) in model.context_agents" :key="k">
                  <h4>Agent Name: {{ agent.name }}</h4>

                  <div v-for="(context, i) in agent.contexts" :key="i">
                    <h5>{{ context.name }} - {{ context.value }}</h5>
                  </div>
                </div>
              </div>

              <button class="button is-small is-primary is-rounded">
                Add Context Agent
              </button>
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
import ChildTree from "@/views/AdaptationMechanism/ChildTree";
export default {
  name: "AdaptationMechanism",
  components: { ChildTree },
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
      converting: true,
      model: {
        feature_tree: [],
        context_agents: []
      }
    };
  },

  watch: {
    modalActive() {
      if (this.modalActive) {
        this.startConversion();
      }
    }
  },

  methods: {
    startConversion() {
      const constraints = this.convertConstraints(this.constraints);
      let fModel = this.parseFeatureModel(this.featureTree[0]);

      fModel = this.mapGroupedConstraints(fModel);
      fModel = this.pushConstrainsAsStates(fModel, constraints);

      console.log(fModel, constraints);
      // TODO, por fim, limpar depedências duplicadas nos estados

      this.model.feature_tree = [fModel];
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

    // 3rd Phase - Push Constraints into fModel as States
    pushConstrainsAsStates(feature, constraints = []) {
      const hasRelatedConstraints = constraints.filter(
        constraint => constraint.in === feature.id
      );

      if (hasRelatedConstraints.length) {
        for (const constraint of hasRelatedConstraints) {
          for (const state of feature.states) {
            if (state.name === "On") {
              state.requires.push(constraint.val);
            }
          }
        }
      }

      for (let child of feature.children) {
        child = {
          ...child,
          ...this.pushConstrainsAsStates(child, constraints)
        };
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
    },

    convertConstraints(constraints = []) {
      let parsed = [];
      constraints.map(constraint => {
        const [ft1, ft2] = constraint.list;
        if (!ft1.val && !ft2.val) {
          parsed.push({
            in: ft1.id,
            val: { address: ft2.id, value: false }
          });
          parsed.push({
            in: ft2.id,
            val: { address: ft1.id, value: false }
          });
        } else if (!ft1.val) {
          parsed.push({
            in: ft1.id,
            val: { address: ft2.id, value: true }
          });
        } else if (!ft2.val) {
          parsed.push({
            in: ft2.id,
            val: { address: ft1.id, value: true }
          });
        }
      });
      return parsed;
    }
  }

  // mounted() {
  //   this.startConversion();
  // }
};
</script>

<style scoped></style>
