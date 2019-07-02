<template>
  <div class="apply-measures">
    <div class="box">
      <div v-if="measures.length == 0">
        <button class="button" @click="openSelectMeasuresInModal">Apply Measures</button>
      </div>
      <div v-else>
        <button class="button is-primary" @click="openSelectMeasuresInModal">Reapply Measures</button>
        <!-- <h1 class="title">Manutenabilidade</h1> -->
        <h1 class="has-text-centered is-size-5">Measures Result</h1>
        <br />
        <b-table :data="data" default-sort-direction="asc" default-sort="name">
          <template slot-scope="props">
            <b-table-column field="id" label="ID" width="40" numeric>{{ props.index+1 }}</b-table-column>
            <b-table-column
              field="name"
              label="Measure"
              sortable
            >{{ props.row.qualityMeasure.name }}</b-table-column>
            <b-table-column
              field="initials"
              label="Initials"
              centered
            >{{ props.row.qualityMeasure.initials }}</b-table-column>
            <b-table-column
              field="measure"
              label="Measure Value"
              centered
            >{{ props.row.value.toFixed(2) }}</b-table-column>
            <b-table-column field="status" label="Thresholds Status" centered>
              <div v-html="checkMeasureStatus(props.row)"></div>
            </b-table-column>
            <b-table-column label="Details" centered>
              <b-tooltip label="See Details">
                <a class="tag is-medium" @click="openThresholdDetailsInModal(props.row)">
                  <i class="fas fa-chart-area"></i>
                </a>
              </b-tooltip>
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import SelectMeasures from "./components/SelectMeasures";
import ThresholdDetails from "./components/ThresholdDetails";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      openAll: true,
      data: []
    };
  },

  methods: {
    checkMeasureStatus(data) {
      if (data.value <= data.veryLow)
        return '<span class="tag veryLow">Very Low</span>';
      else if (data.value <= data.low)
        return '<span class="tag low">Low</span>';
      else if (data.value <= data.high)
        return '<span class="tag moderate">Moderate</span>';
      else if (data.value <= data.veryHigh)
        return '<span class="tag high">High</span>';
      else return '<span class="tag veryHigh">Very High</span>';
    },

    openSelectMeasuresInModal() {
      this.$modal.open({
        parent: this,
        component: SelectMeasures,
        props: {
          contexts: this.contexts
        },
        hasModalCard: true
      });
    },

    openThresholdDetailsInModal(data) {
      this.$modal.open({
        parent: this,
        component: ThresholdDetails,
        props: {
          data: data
        },
        hasModalCard: true
      });
    }
  },

  watch: {
    valeThresholds() {
      /**
       * This is necessary because the server side send Thresholds value for all measures
       * rather than send only Thresholds for caulculated measures.
       */

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
  },

  computed: {
    ...mapGetters({
      contexts: "featureModel/getFeatureModelContext",
      measures: "qualityMeasures/getResultMeasuresComputation",
      featureModel: "featureModel/getFeatureModel",
      valeThresholds: "valeThresholds/getValeThresholds"
    })
  },

  mounted() {
    this.$store.dispatch("qualityMeasures/fetchMeasuresOnDatabase");
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
