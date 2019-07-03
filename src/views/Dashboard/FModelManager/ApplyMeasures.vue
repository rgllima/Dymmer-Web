<template>
  <div class="apply-measures">
    <div class="box">
      <div v-if="groupedMeasuresThresholds.length == 0">
        <button
          class="apply-measures--button button"
          @click="openSelectMeasuresInModal"
        >Apply Measures</button>
      </div>
      <div v-else>
        <button class="button is-primary" @click="openSelectMeasuresInModal">Reapply Measures</button>
        <h1 class="has-text-centered is-size-5">Measures Result</h1>
        <br />
        <b-table :data="groupedMeasuresThresholds" default-sort-direction="asc" default-sort="name">
          <template slot-scope="props">
            <b-table-column field="id" label="ID" width="40" numeric>{{ props.index+1 }}</b-table-column>
            <b-table-column field="name" label="Measure" sortable>{{ props.row.name }}</b-table-column>
            <b-table-column field="initials" label="Initials" centered>{{ props.row.initials }}</b-table-column>
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
    return {};
  },

  methods: {
    checkMeasureStatus(data) {
      if (data.value <= data.low)
        return '<span class="tag veryLow">Very Low</span>';
      else if (data.value <= data.moderate)
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

  computed: {
    ...mapGetters({
      contexts: "featureModel/getFeatureModelContext",
      featureModel: "featureModel/getFeatureModel",
      groupedMeasuresThresholds: "qualityMeasures/getGroupedMeasuresThresholds"
    })
  },

  mounted() {
    this.$store.dispatch("qualityMeasures/fetchMeasuresOnDatabase");
  }
};
</script>

<style lang="sass">
.apply-measures
  &--button
    margin: 0 auto

.veryLow
  background-color: #f6db2f !important
.low
  background-color: #faeb8c !important
.moderate
  background-color: #2dd07b !important
  color: white !important
.high
  background-color: #fcced8 !important
.veryHigh
  background-color: #ef8898 !important
  color: white !important
</style>
