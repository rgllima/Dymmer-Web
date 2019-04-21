<template>
  <div id="measure-charts" style="padding: 25px 10px">
    <div class="tile is-ancestor is-vertical">
      <div class="tile">
        <div class="tile is-parent">
          <!-- <div class="tile is-child notification">
            <line-chart
              style="height: 280px"
              :data="{labels: [1, 2, 3, 4, 5], data: [1, 2, 3, 4, 5]}"
            />
          </div> -->
        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile is-child">
          <b-table :data="data" default-sort-direction="asc" default-sort="name">
            <template slot-scope="props">
              <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.index+1 }}</b-table-column>
              <b-table-column
                field="qualityMeasure.name "
                label="Measure"
                sortable
              >{{ props.row.qualityMeasure.name }}</b-table-column>
              <b-table-column
                field="initials"
                label="Initials"
                sortable
              >{{ props.row.qualityMeasure.initials }}</b-table-column>
              <b-table-column
                field="veryLow"
                label="Very Low"
                sortable
                centered
              >{{ props.row.veryLow.toFixed(2) }}</b-table-column>
              <b-table-column
                field="low"
                label="Low"
                sortable
                centered
              >{{ props.row.low.toFixed(2) }}</b-table-column>
              <b-table-column
                field="moderate"
                label="Moderate"
                sortable
                centered
              >{{ props.row.moderate.toFixed(2) }}</b-table-column>
              <b-table-column
                field="high"
                label="High"
                sortable
                centered
              >{{ props.row.high.toFixed(2) }}</b-table-column>
              <b-table-column
                field="veryHigh"
                label="Very High"
                sortable
                centered
              >{{ props.row.veryHigh.toFixed(2) }}</b-table-column>
              <b-table-column
                field="value"
                label="Result"
                sortable
                centered
              ><strong>{{ props.row.value.toFixed(2) }}</strong></b-table-column>
              <b-table-column
                field="status"
                label="Status"
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
import Line from "@/components/Charts/Line";
import { mapGetters } from "vuex";

export default {
  components: {
    "line-chart": Line
  },
  data() {
    return {
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

  computed: {
    ...mapGetters({
      valeThresholds: "valeThresholds/getValeThresholds",
      measures: "qualityMeasures/getResultMeasuresComputation"
    })
  },

  methods: {
    checkMeasureStatus(data) {
      console.log(data);
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

  mounted() {
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

