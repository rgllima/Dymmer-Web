<template>
  <div id="feature-model-list" style="padding: 25px 10px">
    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child">
          <b-table :data="data" default-sort-direction="asc" default-sort="name" ref="loading">
            <template slot-scope="props">
              <b-table-column field="id" label="ID" width="40" sortable numeric>{{ props.index+1 }}</b-table-column>
              <b-table-column field="name" label="Feature Name" sortable>
                <a @click="showFeatureModel(props.row)">{{ props.row.name }}</a>
              </b-table-column>
              <b-table-column
                field="type"
                label="Type"
                width="80"
                sortable
                centered
              >{{ props.row.type }}</b-table-column>
              <b-table-column field="numFeatures" label="Nº Features" width="120" sortable centered>
                <span class="tag is-success">{{ props.row.number_of_features }}</span>
              </b-table-column>
              <b-table-column field="creator" label="Creator" sortable>{{ props.row.creator }}</b-table-column>
              <b-table-column field="origin" label="Origin" width="100" sortable centered>
                <span class="tag is-info">{{ props.row.origin }}</span>
              </b-table-column>
              <b-table-column field="created" label="Created" width="100" sortable centered>
                <span
                  class="tag is-warning"
                >{{ props.row.date ? new Date(props.row.date).toLocaleDateString() : 'Unavailable' }}</span>
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
    return {};
  },

  computed: {
    ...mapGetters({
      splList: "featureModelDatabase/getSplList",
      dsplList: "featureModelDatabase/getDsplList"
    }),

    data() {
      let fmodels = [];
      let type = this.$route.query.type;

      if (type)
        type.toLocaleUpperCase() === "SPL" ? fmodels = this.splList : fmodels = this.dsplList;
      else
        fmodels = [].concat(this.splList, this.dsplList);

      return fmodels
    }
  },

  methods: {
    showFeatureModel(featureModel) {
      this.$store.dispatch("featureModel/showFeatureModel", featureModel);
    }
  },

  mounted() {
    this.$store.dispatch("featureModelDatabase/fetchAllFeatureModelsOnDatabase");
  }
};
</script>
