<template>
  <div class="context-manager">
    <div class="tile is-ancestor">
      <div class="context-manager--tile tile is-3 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="has-text-centered subtitle">Available Contexts</p>

          <div v-if="contexts.length !== 0">
            <div class="context-manager--card" v-for="(context, index) in contexts" :key="index">
              <card-context
                :title="context['name']"
                :active="context['active']"
                @selectContext="selectContext"
              />
            </div>
          </div>

          <div v-else>
            <p class="has-text-centered">Árvore sem contexto</p>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box">
          <v-treeview
            v-model="featureModel.feature_tree"
            :openAll="openAll"
            :hasToolbox="false"
            :contextResolutions="contextResolutions"
            :contextInEdition="contextInEdition"
          ></v-treeview>
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
    openAll: true,
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
    selectContext(name) {
      this.$store.dispatch("featureModel/selectContext", name);
      this.changeSelectedContext(name)
    },

    changeSelectedContext(name){
      this.contextResolutions = this.contexts.filter(context => (context.name === name))[0].resolutions
    }
  },

  mounted() {
    console.log(this.featureModel);
    if (this.featureModel.feature_tree.length === 0) this.$router.push("/home");
  }
};
</script>

<style lang="sass">
.context-manager
  .box
    padding: .4rem
  &--tile
    min-width: 220px
  &--card
    cursor: pointer
  &--card:not(:last-child)
   margin-bottom: 10px
</style>
