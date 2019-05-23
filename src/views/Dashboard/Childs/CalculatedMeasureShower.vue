<template>
  <div id="measure-charts" style="padding: 25px 10px">
    <div class="tile is-ancestor is-vertical">

      <div class="tile is-parent">
        <div class="tile is-child box" style="margin-right: 5px !important">
          <h1 class="has-text-centered is-size-5">Feature Diagram</h1>
          <br>
          <v-treeview v-model="featureModel.feature_tree" :openAll="openAll" :hasContext="false"></v-treeview>
        </div>

        <div class="tile is-child box" style="margin-left: 5px !important">
          <h1 class="has-text-centered is-size-5">Calculed Measures</h1>
          <br>
          <b-table :data="data" default-sort-direction="asc" default-sort="name">
            <template slot-scope="props">
              <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.index+1 }}</b-table-column>
              <b-table-column field="name" label="Measure" sortable>{{ props.row.qualityMeasure.name }}</b-table-column>
              <b-table-column field="initials" label="Initials" sortable>{{ props.row.qualityMeasure.initials }}</b-table-column>

              <b-table-column field="measure" label="Result" sortable centered>
                {{ props.row.value.toFixed(2) }}
              </b-table-column>
              <b-table-column
                field="status"
                label="Thresholds Status"
                v-html="checkMeasureStatus(props.row)"
                sortable
                centered
              ></b-table-column>
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
      data: [],
      configThreshroldsView: {
        veryLow: {
          color: ""
        },
        low: {
          color: ""
        },
        moderate: {
          color: ""
        },
        high: {
          color: ""
        },
        veryHigh: {
          color: ""
        }
      }
    };
  },

  methods: {
    checkMeasureStatus(data) {
      // console.log(JSON.parse(JSON.stringify(data)));
      if (data.value <= data.veryLow)
        return '<span class="tag veryLow">Very Low</span>';
      else if (data.value <= data.moderate)
        return '<span class="tag low">Low</span>';
      else if (data.value <= data.high)
        return '<span class="tag moderate">Moderate</span>';
      else if (data.value <= data.veryHigh)
        return '<span class="tag high">High</span>';
      else return '<span class="tag veryHigh">Very High</span>';
    }
  },

  computed: {
    ...mapGetters({
      measures: "qualityMeasures/getResultMeasuresComputation",
      featureModel: "featureModel/getFeatureModel",
      valeThresholds: "valeThresholds/getValeThresholds",
    })
  },

  mounted() {
    if (this.measures.length == 0) this.$router.push("/home");
    if (this.valeThresholds.thresholds.length === 0) this.$router.push("/home");
    // This is a Bad code, need refactor
    //This code manage de trasholds exibition
    let c = [];
    this.measures.forEach(element => {
      let a = this.valeThresholds.thresholds.filter(measure => {
        return element._id === measure.qualityMeasure._id;
      })[0];
      a["value"] = element["value"];
      c.push(a);
    });
    this.data = c;
  }
};
</script>

<style>
.veryLow {
  background-color: #f6db2f !important;
}
.low {
  background-color: #faeb8c !important;
}
.moderate {
  background-color: #2dd07b !important;
  color: white !important;
}
.high {
  background-color: #fcced8 !important;
}
.veryHigh {
  background-color: #ef8898 !important;
  color: white !important;
}
</style>
