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
          <hidden-card>
            <h3 class="title is-4 has-text-centered" slot="titleCard">Corss-Tree Constraints</h3>
            <div slot="contentCard">
              <p>Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus.</p>
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
                <div><label><i class="fa fa-asterisk"></i> Features: </label><span>25</span></div>
                <div><label><i class="fa fa-asterisk"></i> Mandatory: </label><span>25</span></div>
                <div><label><i class="fa fa-asterisk"></i> Optional: </label><span>25</span></div>
                <div><label><i class="fa fa-asterisk"></i> XOR Groups: </label><span>25</span></div>
                <div><label><i class="fa fa-asterisk"></i> OR Groups: </label><span>25</span></div>
                <div><label><i class="fa fa-asterisk"></i> Grouped: </label><span>25</span></div>
                <div><label><i class="fa fa-asterisk"></i> Cross-Tree Constraints (CTC): </label><span>25</span></div>
                <div><label><i class="fa fa-asterisk"></i> CTCT (%): </label><span>25</span></div>
                <div><label><i class="fa fa-asterisk"></i> CTC Distinct Vars : </label><span>25</span></div>
                <div><label><i class="fa fa-asterisk"></i> CTC Clause Density: </label><span>25</span></div>
              </div>
            </hidden-card>
            
            
          </div>

          <div id="button-test">
            <input type="file" id="teste" ref="MyXMLFile" @change="teste">
            <a class="button is-success" @click="sendXML">Save</a>
          </div>
      </div> <!--manage-tree-->
    </div>
  </div>
</template>

<script>

import VTreeview from './TreeView/VTreeview/VTreeview.vue'
import HiddenCard from './HiddenCard/HiddenCard.vue'

import ExampleFeatureModel from '../.././static/featureModelExample.json'

export default {
  name: 'HelloWorld',
    data() {
      return {
        files:[],
        openAll: true,
        feature_model: ExampleFeatureModel.feature_model,
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
      teste(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();

        reader.onload = e =>  console.log(e.target.result)
        reader.readAsText(file);
      },
      sendXML() {


        // this.$http.post('http://4e20fa6f.ngrok.io/xml/xml-to-json', this.$refs.MyXMLFile.files[0],{
        //    headers: {
        //        'Content-Type': 'multipart/form-data'
        //    }
        // })
      }
    },
    components: {
      VTreeview,
      HiddenCard
    }
  }

</script>

<style lang="scss" scoped>
.my-background-color {
  background-color: #ecf6ec !important;
}
</style>
