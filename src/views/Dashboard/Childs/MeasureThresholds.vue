<template>
  <div id="measure-charts" style="padding: 25px 10px">
    <div class="tile is-ancestor is-vertical">
      <div class="tile">
        <div class="tile is-parent">
          <div class="tile is-child notification">
            <line-chart style="height: 280px" :data="{labels: [1, 2, 3, 4, 5], data: [1, 2, 3, 4, 5]}"/>
          </div>
        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile is-child">
          <b-table :data="data" default-sort-direction="asc" default-sort="name">
            <template slot-scope="props">
              <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.index+1 }}</b-table-column>
              <b-table-column field="name" label="Measure" sortable>{{ props.row.name }}</b-table-column>
              <b-table-column field="initials" label="Initials" sortable>{{ props.row.initials }}</b-table-column>
              <b-table-column field="measure" label="Min" sortable centered>10</b-table-column>
              <b-table-column field="measure" label="Max" sortable centered>50</b-table-column>
              <b-table-column field="measure" label="Result" sortable centered>
                <span class="tag is-success">{{ props.row.measure }}</span>
              </b-table-column>
            </template>
          </b-table>
        </div>
        <!-- <div class="tile is-child">
          <b-table :data="data" :default-sort-direction="asc" default-sort="name">
            <template slot-scope="props">
              <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.index+1 }}</b-table-column>
              <b-table-column field="name" label="Measure" sortable>{{ props.row.name }}</b-table-column>
              <b-table-column field="initials" label="Initials" sortable>{{ props.row.initials }}</b-table-column>
              <b-table-column field="measure" label="Min" sortable centered>
                <span class="tag is-warning">10</span>
              </b-table-column>
              <b-table-column field="measure" label="Max" sortable centered>
                <span class="tag is-danger">50</span>
              </b-table-column>
              <b-table-column field="measure" label="Result" sortable centered>
                <span class="tag is-success">{{ props.row.measure }}</span>
              </b-table-column>
            </template>
          </b-table>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Line from "@/components/Charts/Line";

export default {
  components: {
    "line-chart": Line
  },
  data() {
    return {
      data: []
    };
  },

  mounted() {
    this.data = [
      {
        name: "Number of OR Groups",
        initials: "NOR",
        measure: 40
      },
      {
        name: "Number of XOR Groups",
        initials: "NOR",
        measure: 40
      },
      {
        name: "Number of Groups",
        initials: "NOR",
        measure: 40
      },
      {
        name: "Branching Factor",
        initials: "NOR",
        measure: 40
      }
    ];
  }
};
</script>
