<template>
  <div id="measure-charts" style="padding: 25px 10px">
    <div class="tile is-ancestor is-vertical">

      <div class="tile is-parent">
        Ahakajsjaskajskajksk ksjaskjaksjajk
      </div>

      <div class="tile is-parent">
        <div class="tile is-child box" style="margin-right: 5px !important">
          <h1 class="has-text-centered is-size-5">Feature Diagram</h1>
          <br>
          <v-treeview v-model="featureModel.feature_tree" :openAll="openAll" :hasContext="false"></v-treeview>
        </div>

        <div class="tile is-child box" style="margin-left: 5px !important">
          <h1 class="has-text-centered is-size-5">Calculed Measures</h1>
          <br>
          <b-table :data="measures" default-sort-direction="asc" default-sort="name">
            <template slot-scope="props">
              <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.index+1 }}</b-table-column>
              <b-table-column field="name" label="Measure" sortable>{{ props.row.name }}</b-table-column>
              <b-table-column field="initials" label="Initials" sortable>{{ props.row.initials }}</b-table-column>

              <b-table-column field="measure" label="Result" sortable centered>
                {{ props.row.value }}
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      openAll: true,
      data: []
    };
  },

  computed: {
    ...mapGetters({
      measures: "qualityMeasures/getResultMeasuresComputation",
      featureModel: "featureModel/getFeatureModel"
    })
  },

  mounted() {
    if (this.measures.length == 0) this.$router.push("/home");
  }
};
</script>

