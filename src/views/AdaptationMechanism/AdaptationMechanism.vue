<template>
  <div class="adaptation-mechanism">
    <b-modal
      :active="modalActive"
      has-modal-card
      full-screen
      :can-cancel="false"
    >
      <div class="modal-card" style="width: auto">
        <input-modal
          :active="showInputModal"
          @close="closeInputModal"
          @action="handleInputAction"
        />

        <header class="modal-card-head">
          <div class="tile is-parent">
            <div class="tile is-child">
              <p class="modal-card-title has-text-centered">
                Adaptation Mechanism
              </p>
            </div>

            <div class="tile is-child is-1">
              <button
                class="button is-primary is-small"
                type="button"
                @click="startConversion"
              >
                Recompile Model
              </button>
            </div>
          </div>
        </header>
        <section class="modal-card-body" style="overflow: hidden">
          <div v-if="converting">
            <b-loading :is-full-page="false" :active="converting">
              <b-icon
                pack="fas"
                icon="sync-alt"
                size="is-large"
                custom-class="fa-spin"
              />
            </b-loading>
            <p class="has-text-centered title">
              Convertendo Modelo de Features!
            </p>
            <p class="has-text-centered subtitle">Aguarde...</p>
          </div>

          <div v-else class="tile is-ancestor">
            <div class="tile is-parent">
              <div class="tile is-child is-vertical box modal-card__left">
                <p class="subtitle has-text-centered">Custom Feature Model</p>
                <child-tree
                  :simulating="simulating"
                  :tree="model.feature_tree"
                  :dictionary="dictionary"
                  @startLinking="startLinking"
                  @unlinkFeature="unlinkFeature"
                  :level="1"
                />

                <link-feature-modal
                  :active="linkingFeature"
                  :context-agents="model.context_agents"
                  @action="linkFeature"
                  @close="linkingFeature = false"
                />
              </div>

              <div class="tile is-child is-vertical box modal-card__left">
                <div
                  class="tile"
                  style="justify-content: space-between; padding: 10px"
                >
                  <p class="subtitle has-text-centered">Context Agents</p>

                  <div class="tile is-3" style="justify-content: flex-end">
                    <button
                      v-if="!simulating"
                      class="button is-small is-primary"
                      style="margin-right: 10px"
                      @click="openInputModal('addingAgent')"
                    >
                      Add Agent
                    </button>

                    <button
                      v-if="!simulating"
                      class="button is-small is-success"
                      @click="startSimulation"
                    >
                      Simulate
                    </button>
                    <button
                      v-else
                      class="button is-small is-danger"
                      @click="simulating = false"
                    >
                      End Simulation
                    </button>
                  </div>
                </div>

                <div class="contexts">
                  <div
                    class="box"
                    v-for="(agent, k) in model.context_agents"
                    :key="k"
                  >
                    <div class="tile" style="justify-content: space-between">
                      <h4>{{ agent.name }}</h4>
                      <div class="tile is-4" style="justify-content: flex-end">
                        <button
                          v-if="!simulating"
                          class="button is-small is-primary"
                          @click="openInputModal('addingContext', agent)"
                        >
                          Add Context
                        </button>
                        <button
                          v-if="!simulating"
                          class="button is-small is-danger"
                          style="margin-left: 5px;"
                          @click="removeAgent(agent.id)"
                        >
                          Del Agent
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div
                      class="tile"
                      style="justify-content: space-between"
                      v-for="(context, i) in agent.contexts"
                      :key="i"
                    >
                      <h5>-----| {{ context.name }}</h5>
                      <a
                        v-if="simulating"
                        @click="context.value = !context.value"
                        ><b-icon
                          class="pointer danger-color"
                          :class="context.value ? 'active-btn' : ''"
                          pack="fas"
                          :icon="context.value ? 'toggle-on' : 'toggle-off'"
                      /></a>
                      <a
                        v-else
                        @click="
                          removeContext({
                            agent_id: agent.id,
                            context_id: context.id
                          })
                        "
                        ><b-icon
                          class="pointer danger-color"
                          size="is-small"
                          pack="fas"
                          icon="trash"
                      /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-danger"
            type="button"
            @click="handleCloseModal"
          >
            Close
          </button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ChildTree from "@/views/AdaptationMechanism/ChildTree";
import InputModal from "@/views/AdaptationMechanism/InputModal";
import LinkFeatureModal from "@/views/AdaptationMechanism/LinkFeatureModal";
import AdaptationMechanism from "@/util/adaptation-mechanism";

export default {
  name: "AdaptationMechanism",
  components: { LinkFeatureModal, InputModal, ChildTree },
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
      default: Array
    },
    fMContextAgents: {
      type: Array,
      default: Array
    },
    agents: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {
      converting: false,
      simulating: false,
      agent: null,
      addingAgent: false,
      addingContext: false,
      showInputModal: false,
      linkingFeature: false,
      linkingFeatureId: "",
      agentIndexNum: 1,
      dictionary: {
        context_agents: {},
        features: {}
      },
      model: {
        feature_tree: [],
        context_agents: []
      }
    };
  },

  watch: {
    modalActive() {
      if (this.modalActive && !this.fMContextAgents.length) {
        this.startConversion();
      }
    },

    "model.context_agents": {
      deep: true,
      handler() {
        if (this.simulating) this.execMechanismSimulation();
        else {
          if (!this.model.context_agents.length) return;
          this.$store.commit("featureModel/setAgents", {
            list: this.model.context_agents,
            index: this.agentIndexNum
          });
        }
      }
    },

    "model.feature_tree": {
      deep: true,
      handler() {
        if (!this.model.feature_tree.length) return;
        this.$store.commit(
          "featureModel/setFmContextAgents",
          this.model.feature_tree
        );
      }
    }
  },

  methods: {
    execMechanismSimulation() {
      const { feature_tree, context_agents } = this.model;
      AdaptationMechanism.start(feature_tree, context_agents);
    },

    startSimulation() {
      this.simulating = true;
      this.execMechanismSimulation();
    },

    openInputModal(action, agent) {
      this[action] = true;
      this.showInputModal = true;
      this.agent = agent;
    },

    closeInputModal() {
      this.showInputModal = false;
      this.addingAgent = false;
      this.addingContext = false;
    },

    handleInputAction(name) {
      if (this.addingAgent) return this.addAgent(name);
      return this.addContext(name);
    },

    addAgent(name) {
      this.model.context_agents.push({
        id: `ca_${this.agentIndexNum}`,
        name,
        ctxIndex: 1,
        contexts: []
      });

      this.agentIndexNum++;
    },

    removeAgent(id) {
      const agent = this.model.context_agents.find(ctx => ctx.id === id);
      for (const context of agent.contexts) {
        delete this.dictionary.context_agents[context.id];
        this.unlinkFeature(context.id)
      }

      this.model.context_agents = this.model.context_agents.filter(
        obj => obj !== agent
      );
    },

    addContext(name) {
      const { id } = this.agent;

      const context = {
        id: `${id}_${this.agent.ctxIndex}`,
        name,
        value: false,
        states: [
          { name: "Off", value: false },
          { name: "On", value: true }
        ]
      };

      this.agent.ctxIndex++;
      this.agent.contexts.push(context);
      this.dictionary.context_agents[context.id] = {
        name: `${this.agent.name}_${context.name}`,
        ref: context
      };
    },

    removeContext({ agent_id, context_id }) {
      for (const agent of this.model.context_agents) {
        if (agent.id === agent_id) {
          agent.contexts = agent.contexts.filter(({ id }) => id !== context_id);
        }
      }

      delete this.dictionary.context_agents[context_id];
      this.unlinkFeature(context_id);
    },

    startLinking(featureId) {
      this.linkingFeatureId = featureId;
      this.linkingFeature = true;
    },

    unlinkFeature(contextId) {
      const fModel = this.popConstrainsAsStates(
        JSON.parse(JSON.stringify(this.model.feature_tree[0])),
        contextId
      );

      this.model.feature_tree = [fModel];
    },

    linkFeature(payload) {
      const fModel = this.pushConstrainsAsStates(
        JSON.parse(JSON.stringify(this.model.feature_tree[0])),
        [
          {
            in: this.linkingFeatureId,
            val: payload
          }
        ]
      );

      this.model.feature_tree = [fModel];
    },

    startConversion() {
      this.converting = true;
      const constraints = this.convertConstraints(this.constraints);
      let fModel = this.parseFeatureModel(this.featureTree[0]);

      fModel = this.mapGroupedConstraints(fModel);
      fModel = this.pushConstrainsAsStates(fModel, constraints);

      this.createFeatureDictionary(fModel);

      this.model.feature_tree = [fModel];
      this.converting = false;
    },

    createFeatureDictionary(feature) {
      this.dictionary.features[feature.id] = {
        name: feature.name,
        ref: feature
      };

      for (const child of feature.children) {
        this.createFeatureDictionary(child);
      }
    },

    createContextDictionary() {
      for (const agent of this.model.context_agents) {
        for (const context of agent.contexts) {
          this.dictionary.context_agents[context.id] = {
            name: `${agent.name}_${context.name}`,
            ref: context
          };
        }
      }
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
              const exists = state.requires.filter(
                obj => obj.address === constraint.val.address
              );

              if (!exists.length) {
                state.requires.push(constraint.val);
              }
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

    // remove contexts of feature tree
    popConstrainsAsStates(feature, contextId) {
      for (const state of feature.states) {
        if (state.name === "On") {
          state.requires = state.requires.filter(
            ({ address }) => address !== contextId
          );
        }
      }

      for (let child of feature.children) {
        child = {
          ...child,
          ...this.popConstrainsAsStates(child, contextId)
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
              const exists = state.requires.filter(
                obj => obj.address === req.id
              );

              if (!exists.length) {
                state.requires.push({
                  address: req.id,
                  value: false
                });
              }
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
    },

    handleCloseModal() {
      this.simulating = false;
      this.$emit("close");
    }
  },

  mounted() {
    const agents = JSON.parse(JSON.stringify(this.agents));

    this.model.context_agents = agents.list || [];
    this.agentIndexNum = agents.index || 1;
    this.createContextDictionary();

    if (this.fMContextAgents.length) {
      this.model.feature_tree = JSON.parse(
        JSON.stringify(this.fMContextAgents)
      );
      this.createFeatureDictionary(this.model.feature_tree[0]);
    }
  }
};
</script>

<style lang="scss" scoped>
.adaptation-mechanism {
  .contexts {
    h4,
    h5 {
      margin: 0;
    }

    hr {
      margin: 10px 0;
    }

    .box {
      margin-bottom: 10px;
    }

    .danger-color {
      color: #ff6666;
    }

    .pointer {
      cursor: pointer;
    }

    .active-btn {
      color: #008000;
    }
  }
}
</style>
