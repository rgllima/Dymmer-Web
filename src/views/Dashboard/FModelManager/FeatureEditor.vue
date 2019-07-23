<template>
  <div class="feature-editor">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child is-vertical feature-editor--scroll-box box">
          <div class="control">
            <h1 class="has-text-centered is-size-5">Feature Diagram</h1>
            <br />
          </div>

          <v-treeview
            :value="featureTree"
            :openAll="openAll"
            :hasToolbox="true"
            @addNode="addNode"
            @editName="editName"
            @removeNode="removeNode"
            @swapType="swapType"
          ></v-treeview>
        </div>
        <div class="tile is-child is-vertical" style="padding-left:10px">
          <div class="tile is-vertical">
            <div class="tile is-child">
              <constraint-card :constraints="constraints" />
            </div>
            <div class="tile is-child">
              <feature-info :featureModel="featureModel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ConstraintCard from "./components/ConstraintCard";
import FeatureInfoCard from "./components/FeatureInfoCard";

export default {
  components: {
    "constraint-card": ConstraintCard,
    "feature-info": FeatureInfoCard
  },

  data() {
    return {
      openAll: true,
      featureTree: [],
      constraints: []
    };
  },

  methods: {
    async generateVisualConstraints() {
      let conKeys;
      let conFeatures;
      let ftConstraints = this.featureModel.constraints;

      for (const index in ftConstraints) {
        conFeatures = [];
        conKeys = ftConstraints[index].value.split("or");

        for (const key in conKeys) {
          let id = conKeys[key].replace(/[\s\W-]+/g, "");
          let ftName = await this.searchNameConstraint(
            this.featureModel.feature_tree[0],
            id
          );
          let ftNameReplaced = conKeys[key]
            .replace(`${id}`, ` ${ftName}`)
            .trim();
          ftNameReplaced = ftNameReplaced.replace(`~`, `NOT`);
          conFeatures.push(ftNameReplaced);
        }

        let definitiveConstraint = "";

        for (const key in conFeatures) {
          definitiveConstraint += conFeatures[key];
          if (key < conFeatures.length - 1) definitiveConstraint += " OR ";
        }

        this.constraints.push(definitiveConstraint);
      }
    },

    async searchNameConstraint(feature_tree, element) {
      let a = "";
      for (const node in feature_tree.children) {
        if (feature_tree.children[node].id === element)
          a += feature_tree.children[node].name;
        else
          a += await this.searchNameConstraint(
            feature_tree.children[node],
            element
          );
      }
      return a;
    },

    addNode(data) {
      this.$store.commit("featureModel/addFeature", data);
    },
    editName(data) {
      this.$store.commit("featureModel/renameFeature", data);
    },
    swapType(id) {
      this.$store.commit("featureModel/swapFeatureType", id)
    },
    removeNode(id) {
      this.$store.commit("featureModel/deleteFeature", id);
    }
  },

  computed: {
    ...mapGetters({
      featureModel: "featureModel/getFeatureModel"
    })
  },

  watch: {
    featureModel: {
      handler: function(newValue) {
        this.featureTree = JSON.parse(
          JSON.stringify(this.featureModel.feature_tree)
        );
      },
      deep: true
    }
  },

  mounted() {
    if (this.featureModel.feature_tree.length === 0) {
      this.$router.push("/home");
    } else {
      this.generateVisualConstraints();
      this.featureTree = JSON.parse(
        JSON.stringify(this.featureModel.feature_tree)
      );
    }
  }
};
</script>

<style lang="sass">
.feature-editor
  height: 100%
  .box
    padding: .4rem
  &--scroll-box
    min-height: 500px
    height: calc(100vh - 150px)
    overflow-x: hidden
    overflow-y: scroll
</style>
