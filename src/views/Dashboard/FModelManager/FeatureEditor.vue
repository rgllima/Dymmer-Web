<template>
  <div class="feature-editor">
    <b-modal :active.sync="constraintModalActive" has-modal-card full-screen :can-cancel="false">
      <constraint-modal
        :featureList="featureList"
        :constraints="constraints"
        @saveConstraints="saveConstraints"
      />
    </b-modal>

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
            @addNode="addNode"
            @editName="editName"
            @removeNode="removeNode"
            @swapType="swapType"
            editorToolbox
          ></v-treeview>
        </div>
        <div class="tile is-child is-vertical" style="padding-left:10px">
          <div class="tile is-vertical">
            <div class="tile is-child">
              <b-collapse class="card">
                <div slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
                  <p class="card-header-title has-text-centered">Cross-Tree Constraints</p>
                  <a class="card-header-icon">
                    <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
                  </a>
                </div>
                <div class="card__button">
                  <button class="button is-small is-primary" @click="constraintModalActive=true">
                    <p>Edit Constraints</p>
                  </button>
                </div>
                <constraint-card :isEditing="false" :constraints="constraints" />
              </b-collapse>
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
import EditConstraintModal from "./components/editConstraintModal";

export default {
  components: {
    "constraint-card": ConstraintCard,
    "feature-info": FeatureInfoCard,
    "constraint-modal": EditConstraintModal
  },

  data() {
    return {
      openAll: true,
      featureTree: [],
      featureList: [],
      constraints: [],
      constraintModalActive: false
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

          let ftSplitted = ftNameReplaced.split(" ");

          if (ftSplitted[0] === "~")
            conFeatures.push({
              val: false,
              feature: ftNameReplaced.replace(`~ `, ``),
              id: id
            });
          else conFeatures.push({ val: true, feature: ftNameReplaced, id: id });
        }
        this.constraints.push({
          name: ftConstraints[index].name,
          list: conFeatures
        });
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

    createFeatureList(feature_tree) {
      for (const node of feature_tree.children) {
        let { name, id, type } = node;
        if (node.type !== "g" && node.type !== "m")
          this.featureList.push({ name, id, type });
        this.createFeatureList(node);
      }
    },

    addNode(data) {
      this.$store.commit("featureModel/addFeature", data);
    },
    editName(data) {
      this.$store.commit("featureModel/renameFeature", data);
    },
    swapType(id) {
      this.$store.commit("featureModel/swapFeatureType", id);
    },
    removeNode(id) {
      this.$store.commit("featureModel/deleteFeature", id);
    },

    async saveConstraints(payload) {
      let constraints = [];
      payload.map(cts => {
        let value = "";

        for (const i in cts.list) {
          if (!cts.list[i].val) value += "~";
          value += cts.list[i].id;
          if (i < cts.list.length-1) value += " or ";
        }

        constraints.push({ name: cts.name, value: value });
      });
      await this.$store.commit("featureModel/saveConstraints", constraints);
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
        this.constraints = [];
        this.featureList = [];
        this.generateVisualConstraints();
        this.createFeatureList(this.featureModel.feature_tree[0]);
      },
      deep: true
    }
  },

  mounted() {
    if (this.featureModel.feature_tree.length === 0) {
      this.$router.push("/home");
    } else {
      this.generateVisualConstraints();
      this.createFeatureList(this.featureModel.feature_tree[0]);
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
  .animation-content
    padding: 0
  .box
    padding: .4rem
  &--scroll-box
    min-height: 500px
    height: calc(100vh - 150px)
    overflow-x: hidden
    overflow-y: scroll
.card__button
  margin-top: 10px
  margin-right: 10px
  text-align: right
</style>
