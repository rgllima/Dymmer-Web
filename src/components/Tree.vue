<template>
  <div>
    <div id="tree">
      <v-treeview v-model="feature_model.feature_tree" :openAll="openAll"></v-treeview>
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
            "-name":"Prontuário Eletrônico de Pacientes",
            "meta":{
               "data":[
                  {
                     "-name":"description",
                     "#text":"Prontuário Eletrônico de Pacientes"
                  },
                  {
                     "-name":"creator",
                     "#text":"Bruno"
                  },
                  {
                     "-name":"address"
                  },
                  {
                     "-name":"email",
                     "#text":"brunogomes3000@gmail.com"
                  },
                  {
                     "-name":"phone"
                  },
                  {
                     "-name":"website"
                  },
                  {
                     "-name":"organization",
                     "#text":"IFRN"
                  },
                  {
                     "-name":"department"
                  },
                  {
                     "-name":"date"
                  },
                  {
                     "-name":"reference"
                  }
               ]
            },
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

    },
    components: {
      VTreeview
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tree {
    max-width: 380px;
  }
</style>
