<template>
  <div class="context-manager">
    <b-modal :active.sync="modalActive" :width="300">
      <div class="box">
        <div class="field">
          <label class="label has-text-centered">Context name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Insert a context name..."
              v-model="contextName"
            >
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control" style="width: 50%; margin: 0">
            <button class="button is-danger is-link is-inverted" @click="modalActive=false">Cancel</button>
          </div>
          <div class="control" style="width: 50%;margin: 0; text-align: right">
            <button class="button is-success is-inverted" @click="addContext">Create</button>
          </div>
        </div>
      </div>
    </b-modal>

    <div class="tile is-ancestor">
      <div class="context-manager--tile tile is-3 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="has-text-centered subtitle">Available Contexts</p>

          <div v-if="contexts.length !== 0">
            <div class="context-manager--card" v-for="(context, index) in contexts" :key="index">
              <card-context
                :title="context['name']"
                :active="context['isTheCurrent']"
                @selectContext="selectContext"
                @deleteContext="deleteContext"
                @saveNewContextName="saveNewContextName"
              />
            </div>
          </div>

          <div v-else>
            <p class="has-text-centered">There are no contexts.</p>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div v-if="contexts.length !== 0" class="tile is-child context-manager--scroll-box box">
          <div class="field is-grouped">
            <div class="control" style="width: 55%; min-width: 150px">
              <p class="has-text-right subtitle">Context View</p>
            </div>
            <div class="control has-addons has-text-right" style="width: 43%; min-width: 150px">
              <button
                class="button is-info is-small"
                style="margin-right: 10px"
                @click="modalActive=true"
                :disabled="contextInEdition"
              >Add Context</button>
              <button
                v-if="!contextInEdition"
                class="button is-warning is-small"
                @click="editContext"
                :disabled="contextResolutions.length === 0"
              >Edit Context</button>
              <button v-else class="button is-success is-small" @click="saveContext">Save Context</button>
            </div>
          </div>

          <div v-if="contextResolutions.length !== 0">
            <v-treeview
              v-model="featureModel.feature_tree"
              :openAll="openAll"
              :hasToolbox="false"
              :contextResolutions="contextResolutions"
              :contextInEdition="contextInEdition"
              @changeFeatureStatus="changeFeatureStatus"
            ></v-treeview>
          </div>

          <div
            v-else
            style="display: flex; align-items: center; height: 70%; justify-content: center;"
          >
            <p class="has-text-centered">Select an available context in the left box!</p>
          </div>
        </div>

        <div v-else class="tile is-child context-manager--empty-context box">
          <button class="context-manager--button button" @click="modalActive=true">Add Context</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardContext from "./components/ContextCard";

export default {
  components: {
    "card-context": CardContext
  },

  data: () => ({
    modalActive: false,
    openAll: true,
    contextName: "",
    contextInEdition: false,
    contextResolutions: []
  }),

  computed: {
    ...mapGetters({
      contexts: "featureModel/getFeatureModelContext",
      featureModel: "featureModel/getFeatureModel"
    })
  },

  methods: {
    changeFeatureStatus(node){
      this.$store.dispatch("featureModel/changeContext", node);
    },

    selectContext(name) {
      this.$store.commit("featureModel/selectContext", name);
      this.changeSelectedContext(name);
    },

    changeSelectedContext(name) {
      this.contextResolutions = this.contexts.filter(
        context => context.name === name
      )[0].resolutions;
    },

    addContext() {
      if (!this.contextName.trim()) {
        this.$toast.open({
          message: "Please, insert a context name!",
          type: "is-danger"
        });
        return;
      }
      let context = {};

      context["constraints"] = [];
      context["name"] = this.contextName;
      context["resolutions"] = [];

      this.createContextResolution(this.featureModel.feature_tree, context["resolutions"]);

      this.$store.commit("featureModel/addContext", context);
      this.selectContext(this.contextName);

      this.contextInEdition = true;
      this.modalActive = false;
      this.contextName = "";
    },

    editContext() {
      this.contextInEdition = true;
    },

    saveContext() {
      this.contextInEdition = false;
    },

    createContextResolution(nodes, resolutions) {
      for (const child of nodes) {
        if (child.type === "m") {
          resolutions.push({
            feature_id: `${child.id}`,
            feature_name: `${child.name}`,
            status: true
          });
        }

        this.createContextResolution(child.children, resolutions);
      }
    },

    deleteContext() {
      this.$store.commit("featureModel/deleteContext")
    },

    saveNewContextName(context) {
      this.$store.commit("featureModel/renameContext", context)
    }
  },

  mounted() {
    if (this.featureModel.feature_tree.length === 0) this.$router.push("/home");
  }
};
</script>

<style lang="sass">
@import "../../../assets/css/colors"
@import "../../../assets/css/animations"

.context-manager
  .box
    padding: .4rem
  .animation-content
    overflow: hidden
  &--scroll-box
    min-height: 500px
    height: calc(100vh - 150px)
    overflow: scroll
  &--tile
    min-width: 220px
  &--card
    cursor: pointer
  &--card:not(:last-child)
   margin-bottom: 10px
  &--empty-context
    display: flex
    align-items: center
  &--button
    margin: 0 auto
    background: $green-save
    color: white
  &--button:hover
    color: white
    animation: pulse 2s infinite
</style>
