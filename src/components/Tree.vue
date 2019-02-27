<template>
  <div id="tree-component" class="column">
    <div class="columns">

      <div id="tree-view" class="column">
        <div class="box my-background-color">
          <hidden-card active>
            <h3 class="title is-4 has-text-centered" slot="titleCard">Feature Diagram</h3>
            <div class="box-content" slot="contentCard">
              <v-treeview v-model="feature_model.feature_tree" :openAll="openAll"></v-treeview>
            </div>
          </hidden-card>
        </div> <!--tree-view-->

        <div id="tree-constraints" class="box my-background-color">
          <hidden-card active>
            <h3 class="title is-4 has-text-centered" slot="titleCard">Corss-Tree Constraints</h3>
            <div slot="contentCard" v-if="feature_model.length > 0">
              <div v-if="feature_model.constraints">
                <p v-for="(value, key) in feature_model.constraints" :key="key">{{Object.values(value).toString()}}</p>
              </div>
              <div v-if="feature_model.constraints.length === 0">
                <p>No constraints</p>
              </div>
            </div>
          </hidden-card>
        </div> <!-- tree-constraints -->

        <div id="tree-info" class="box my-background-color">
          <hidden-card>
            <h3 class="title is-4 has-text-centered" slot="titleCard">Feature Information</h3>
            <div slot="contentCard">
              <div class="field is-horizontal">
                <label class="label">Name your feature model: </label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                        <input class="input is-small" type="text" v-model="feature_model.name" disabled>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <label class="label">Short description of feature model:</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                        <input class="input is-small" type="text" v-model="feature_model.description" disabled>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <label class="label">Primary Author:</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                        <input class="input is-small" type="text" v-model="feature_model.creator" disabled>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <label class="label">Author's Address:</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                        <input class="input is-small" type="text" v-model="feature_model.address" disabled>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <label class="label">Author's Email:</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                        <input class="input is-small" type="email" v-model="feature_model.email" disabled>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <label class="label">Author's Phone Number:</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                        <input class="input is-small" type="text" v-model="feature_model.phone" disabled>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <label class="label">Author's Website:</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                        <input class="input is-small" type="text" v-model="feature_model.website" disabled>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <label class="label">Author's Organization:</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                        <input class="input is-small" type="text" v-model="feature_model.organization" disabled>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <label class="label">Author's Organization Department:</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                        <input class="input is-small" type="text" v-model="feature_model.department" disabled>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <label class="label">Date model was created:</label>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                        <input class="input is-small" type="date" v-model="feature_model.date" disabled>
                    </div>
                  </div>
                </div>
              </div>
              <div id="button-edit" @click="editFeatureInformation">
                <a class="button is-primary">Edit</a>
              </div>
              <div id="button-save-or-cancel" hidden>
                <a class="button is-danger" @click="cancelEditFeatureInformation">Cancel</a>
                <a class="button is-success" @click="saveFeatureInformation">Save</a>
              </div>
            </div>
          </hidden-card>
        </div> <!--tree-info-->
      </div> <!--tree-view-->

      <div id="manage-tree" class="column">

          <div id="tree-statistics" class="box my-background-color">
            <hidden-card active>
              <h3 class="title is-4 has-text-centered" slot="titleCard">Feature Model Statistics</h3>
              <div slot="contentCard">
                <div><label><i class="fa fa-asterisk"></i> Features: </label><span>{{feature_statistics.features}}</span></div>
                <div><label><i class="fa fa-asterisk"></i> Mandatory: </label><span>{{feature_statistics.mandatory}}</span></div>
                <div><label><i class="fa fa-asterisk"></i> Optional: </label><span>{{feature_statistics.optional}}</span></div>
                <div><label><i class="fa fa-asterisk"></i> XOR Groups: </label><span>{{feature_statistics.XORGroups}}</span></div>
                <div><label><i class="fa fa-asterisk"></i> OR Groups: </label><span>{{feature_statistics.ORGroups}}</span></div>
                <div><label><i class="fa fa-asterisk"></i> Grouped: </label><span>{{feature_statistics.grouped}}</span></div>
                <div><label><i class="fa fa-asterisk"></i> Cross-Tree Constraints (CTC): </label><span>{{feature_statistics.constraints}}</span></div>
                <div><label><i class="fa fa-asterisk"></i> CTCT (%): </label><span>0</span></div>
                <div><label><i class="fa fa-asterisk"></i> CTC Distinct Vars : </label><span>0</span></div>
                <div><label><i class="fa fa-asterisk"></i> CTC Clause Density: </label><span>0</span></div>
              </div>
            </hidden-card>


          </div>

          <div id="button-test" class="box">
            <h2 class="title is-4">Import a Feature Model</h2>

            <div class="file">
              <label class="file-label">
                <input class="file-input" type="file" name="xmlString" id="getXmlToString" ref="MyXMLFile" @change="getXmlToString">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a XML file…
                  </span>
                </span>
              </label>
            </div>
          </div>



      </div> <!--manage-tree-->
    </div>
  </div>
</template>

<script>

import VTreeview from './TreeView/VTreeview/VTreeview.vue'
import HiddenCard from './HiddenCard/HiddenCard.vue'

import {
  numberOfFeatures,
  numberOfMandatoryFeatures,
  numberOfOptionalFeatures,
  numberOfGroupedFeatures,
  numberGroupesOr,
  numberGroupesXor
  } from '../services/featureModelMeasures'

// import ExampleFeatureModel from '../.././static/featureModelExample2.json'

export default {
  name: 'HelloWorld',
    data() {
      return {
        //files:[],
        xmlData: null,
        openAll: true,
        feature_model: [],
        feature_statistics: {
          features: 0,
          mandatory: 0,
          optional: 0,
          XORGroups: 0,
          ORGroups: 0,
          grouped: 0,
          constraints: 0,
        },
        constraints: []
      }
    },
    methods: {
      editFeatureInformation() {
        document.getElementById('button-edit').style.display = 'none'
        document.getElementById('button-save-or-cancel').style.display = 'block'
        let inputs = document.getElementsByClassName('input')
        for (var i = 0; i < inputs.length; i++) inputs[i].disabled = false
      },
      cancelEditFeatureInformation() {
        document.getElementById('button-edit').style.display = 'block'
        document.getElementById('button-save-or-cancel').style.display = 'none'
        let inputs = document.getElementsByClassName('input')
        for (var i = 0; i < inputs.length; i++) inputs[i].disabled = true
      },
      saveFeatureInformation() {
        document.getElementById('button-edit').style.display = 'block'
        document.getElementById('button-save-or-cancel').style.display = 'none'
        let inputs = document.getElementsByClassName('input')
        for (var i = 0; i < inputs.length; i++) inputs[i].disabled = true
      },
      getXmlToString(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();

        reader.onload = e =>  {
          this.$http.
            post('https://dymmer-server.herokuapp.com/xml/xml-to-json',
            // post('http://localhost:3000/xml/xml-to-json',
              {
                xmlString: e.target.result
              }
            ).then(res => {
              console.log(JSON.parse(JSON.stringify(res.body)))
              this.feature_model = res.body
              this.featureStatistics(res.body.feature_tree[0])
            })
        }
        reader.readAsText(file);
      },
      async featureStatistics(feature_tree) {
        this.feature_statistics.features = await numberOfFeatures(feature_tree) + 1
        this.feature_statistics.mandatory = await numberOfMandatoryFeatures(feature_tree)
        this.feature_statistics.optional = await numberOfOptionalFeatures(feature_tree)
        this.feature_statistics.grouped = await numberOfGroupedFeatures(feature_tree)
        this.feature_statistics.ORGroups = await numberGroupesOr(feature_tree)
        this.feature_statistics.XORGroups = await numberGroupesXor(feature_tree)
        //this.feature_statistics.constraints = this.feature_model.feature_tree[0].constraints.length
      }
    },
    components: {
      VTreeview,
      HiddenCard
    },
    created() {
      //console.log(JSON.parse(JSON.stringify(ExampleFeatureModel)))
      //console.log(this.feature_model.feature_tree[0].constraints)
      //console.log(JSON.parse(JSON.stringify(this.feature_model.feature_tree[0])))
      // this.featureStatistics(this.feature_model.feature_tree[0])
      //this.formatHTMLConstraints();
    }
  }

</script>

<style lang="scss" scoped>
.my-background-color {
  background-color: #ecf6ec !important;
}
</style>
