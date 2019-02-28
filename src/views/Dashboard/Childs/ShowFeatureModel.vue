<template>
  <div id="show-feature-model-page">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child is-vertical">
          <h1 class="has-text-centered is-size-5">Feature Diagram</h1>
          <div class="box">
            <v-treeview v-model="featureModel.feature_tree" :openAll="openAll" :hasContext="false"></v-treeview>
          </div>
        </div>
        <div class="tile is-child is-vertical" style="padding: 0 10px">
          <h1 class="has-text-centered is-size-5">Manage Feature Model</h1>
          <div class="tile">
            <div class="tile is-child" style="padding: 0 5px">
              <a href="#" class="box">
                <img src="../../../assets/protractor.svg" alt="settings">
                <br>
                <p class="has-text-centered">Apply Quality Measures</p>
              </a>
            </div>
            <div class="tile is-child" style="padding: 0 5px">
              <a href="#" class="box">
                <img src="../../../assets/wireframe.svg" alt="settings">
                <br>
                <p class="has-text-centered">Feature Model Configuration</p>
              </a>
            </div>
            <div class="tile is-child" style="padding: 0 5px">
              <a href="#" class="box">
                <img src="../../../assets/edit-tools.svg" alt="settings">
                <br>
                <p class="has-text-centered">Edit Feature Model</p>
              </a>
            </div>
          </div>
          <div class="tile is-vertical" style="margin-top: 20px; padding: 0 5px;">
            <div class="tile is-child">
              <b-collapse class="card" :open="false">
                <div slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
                  <p class="card-header-title" style="justify-content: center;">Feature Information</p>
                  <a class="card-header-icon">
                    <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
                  </a>
                </div>
                <div class="card-content">
                  <div class="content">
                    <p><strong>Name your feature model: </strong>{{featureModel.name}}</p>
                    <p><strong>Short description of feature model: </strong>{{featureModel.description}}</p>
                    <p><strong>Primary Author: </strong>{{featureModel.creator}}</p>
                    <p><strong>Author's Address: </strong>{{featureModel.address}}</p>
                    <p><strong>Author's Email: </strong>{{featureModel.email}}</p>
                    <p><strong>Author's Phone Number: </strong>{{featureModel.phone}}</p>
                    <p><strong>Author's Website: </strong>{{featureModel.website}}</p>
                    <p><strong>Author's Organization: </strong>{{featureModel.organization}}</p>
                    <p><strong>Author's Organization Department: </strong>{{featureModel.department}}</p>
                    <p><strong>Date model was created: </strong>{{featureModel.date}}</p>
                  </div>
                </div>
              </b-collapse>
            </div>
            <div class="tile is-child">
              <b-collapse class="card">
                <div slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
                  <p
                    class="card-header-title"
                    style="justify-content: center;"
                  >Cross-Tree Constraints</p>
                  <a class="card-header-icon">
                    <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
                  </a>
                </div>
                <div class="card-content">
                  <div class="content">
                    <div v-if="constraints.length !== 0">
                      <p v-for="(value, key) in constraints" :key="key"> <strong>{{key+1}}: </strong> {{ value }}</p>
                    </div>
                    <div v-else>
                      <p>No constraints</p>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "ShowFeatureModel",
  data() {
    return {
      openAll: true,
      constraints: []
    };
  },

  methods: {
    async generateVisualConstraints () {
      let conKeys;
      let conFeatures;
      let ftConstraints = this.featureModel.constraints;

      for (const index in ftConstraints) {
        conFeatures = [];
        conKeys = Object.values(ftConstraints[index])[0].split("or");

        for (const key in conKeys) {
          let id = conKeys[key].replace(/[\s\W-]+/g, "");
          let ftName = await this.searchNameConstraint(this.featureModel.feature_tree[0], id)
          let ftNameReplaced = conKeys[key].replace(`${id}`, ` ${ftName}`).trim();
          ftNameReplaced = ftNameReplaced.replace(`~`, `NOT`);
          conFeatures.push(ftNameReplaced);
        }

        let definitiveConstraint = '';

        for (const key in conFeatures) {
          definitiveConstraint += conFeatures[key];
          if (key < conFeatures.length-1)
            definitiveConstraint += ' OR '
        }

        this.constraints.push(definitiveConstraint);
      }
    },

    async searchNameConstraint (feature_tree, element) {
      let a = '';
      for (const node in feature_tree.children) {
        if (feature_tree.children[node].id === element)
          a += feature_tree.children[node].name;
        else
          a += await this.searchNameConstraint(feature_tree.children[node], element);
      }
      return a;
    }
  },

  computed: {
    ...mapGetters({
      featureModel: 'featureModel/getFeatureModel'
    })
  },

  mounted() {
    if (this.featureModel.feature_tree.length === 0)
      this.$router.push("/home");
    else
      this.generateVisualConstraints();
  },
};
</script>

<style lang="scss" scoped>
#show-feature-model-page {
  padding: 20px;
  p {
    margin: 0;
  }
}
</style>

