<template>
  <div id="tree-component" class="column">
    <div id="tree" class="columns is-desktop">

      <div class="column">
        <div class="box my-background-color">
          <h3 class="title is-4 has-text-centered">Feature Diagram</h3>
          <v-treeview v-model="feature_model.feature_tree" :openAll="openAll"></v-treeview>
        </div>

        <div id="tree-constraints" class="box my-background-color">
          <h3 class="title is-4 has-text-centered">Corss-Tree Constraints</h3>
          <div>
            <p>Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus.</p>
          </div>
        </div>
      </div>

      <div class="column">
          <div id="tree-info" class="box my-background-color">
            <h3 class="title is-4 has-text-centered">Feature Information</h3>

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

          <div id="tree-statistics" class="box my-background-color">
            <h3 class="title is-4 has-text-centered">Feature Model Statistics</h3>
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
      </div>

    </div>
  </div>
</template>

<script>

import VTreeview from './TreeView/VTreeview/VTreeview.vue'

export default {
  name: 'HelloWorld',
    data() {
      return {
        openAll: true,
        treeData: [
          {
            id: 100767.0,
            text: "Test",
            type: "FMM_EMPLOYEE",
            count: 0,
            children: [
              {
                id: 100811.0,
                text: "Basic plan",
                type: "Basic",
                count: 0,
                children: [
                  {
                    id: 101161.0,
                    text: "Top-up",
                    type: "Top-up",
                    count: 152,
                    children: []
                  }
                ]
              },
              {
                id: 100812.0,
                text: "Basic plan",
                type: "Basic",
                count: 0,
                children: []
              },
              {
                id: 101162.0,
                text: "This Top-up can be at level 2",
                type: "Top-up",
                count: 152,
                children: []
              }
            ]
          },
          {
            id: 100768.0,
            text: "Spouse",
            type: "FMM_SPOUSE",
            count: 0,
            children: [
              {
                id: 100813.0,
                text: "Basic plan",
                type: "Basic",
                count: 0,
                children: [
                  {
                    id: 101163.0,
                    text: "Top-up",
                    type: "Top-up",
                    count: 152,
                    children: []
                  }
                ]
              },
              {
                id: 100814.0,
                text: "Basic plan",
                type: "Basic",
                count: 0,
                children: [
                  {
                    id: 101164.0,
                    text: "Top-up",
                    type: "Top-up",
                    count: 152,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: 100769.0,
            text: "Child",
            type: "FMM_CHILD",
            count: 0,
            children: [
              {
                id: 100815.0,
                text: "Basic plan",
                type: "Basic",
                count: 0,
                children: [
                  {
                    id: 101165.0,
                    text: "Top-up",
                    type: "Top-up",
                    count: 152,
                    children: []
                  }
                ]
              },
              {
                id: 100816.0,
                text: "Basic plan",
                type: "Basic",
                count: 0,
                children: [
                  {
                    id: 101166.0,
                    text: "Top-up",
                    type: "Top-up",
                    count: 0,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: 100770.0,
            text: "Parents",
            type: "FMM_PARENT",
            count: 0,
            children: [
              {
                id: 100817.0,
                text: "Basic plan",
                type: "Basic",
                count: 0,
                children: [
                  {
                    id: 101167.0,
                    text: "Top-up",
                    type: "Top-up",
                    count: 124,
                    children: []
                  }
                ]
              }
            ]
          }
        ],
         feature_model:{
            "name":"Prontuário Eletrônico de Pacientes",
            "description": "Model Prontuário Eletrônico de Pacientes",
            "creator": "Bruno",
            "address": "Rua xxx",
            "email": "brunogomes3000@gmail.com",
            "phone": "88888888",
            "website": "www.poow.com",
            "organization": "IFRN",
            "department": "Ciencia",
            "date": "2019-12-20",
            "reference": "www.wowow.com",
            "feature_tree": [{
               "id":"_r",
               "type":"r",
               "name":" PEP",
               "children":[
                  {
                     "id":"_r_1",
                     "type":"m",
                     "name":" Autenticacao",
                     "children":[
                        {
                           "id":"_r_1_2",
                           "type":"m",
                           "name":" Login_Senha",
                           "children":[

                           ]
                        }
                     ]
                  },
                  {
                     "id":"_r_3",
                     "type":"m",
                     "name":" Atendimento",
                     "children":[
                        {
                           "id":"_r_3_4",
                           "type":"m",
                           "name":" Ambulatorial",
                           "children":[

                           ]
                        },
                        {
                           "id":"_r_3_5",
                           "type":"o",
                           "name":" Internado",
                           "children":[

                           ]
                        }
                     ]
                  },
                  {
                     "id":"_r_6",
                     "type":"o",
                     "name":" Evolucao",
                     "children":[
                        {
                           "id":"_r_6_8",
                           "type":"o",
                           "name":" Enfermagem",
                           "children":[

                           ]
                        },
                        {
                           "id":"_r_6_9",
                           "type":"o",
                           "name":" Medica",
                           "children":[

                           ]
                        }
                     ]
                  },
                  {
                     "id":"_r_7",
                     "type":"m",
                     "name":" Cadastro",
                     "children":[

                     ]
                  }
               ]
            }],
            "constraints":null
         }
      };
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
      }
    },
    components: {
      VTreeview
    }
  }

</script>

<style scoped>
.my-background-color{
  background-color: #ecf6ec !important;
}
</style>
