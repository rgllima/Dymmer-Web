<template>
  <div id="feature-model-list box" class="box" style>
    <div class="notification">
      <h1 class="subtitle is-size-3 has-text-centered">Feature Models Repository</h1>
    </div>

    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child is-vertical">
          <div class="field is-grouped is-grouped-right">
            <div class="field has-addons">
              <div class="control">
                <a class="button is-static">Type to Search</a>
              </div>
              <div class="control">
                <input class="input" v-model="search" type="text" placeholder="Find in the repository" />
              </div>
            </div>
          </div>

          <b-table
            :data="filteredList"
            default-sort-direction="asc"
            default-sort="number_of_features"
            ref="loading"
          >
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
              <b-table-column field="number_of_features" label="Nº Features" width="120" sortable centered>
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
    return {
      search: ""
    };
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
        type.toLocaleUpperCase() === "SPL"
          ? (fmodels = this.splList)
          : (fmodels = this.dsplList);
      else fmodels = [].concat(this.splList, this.dsplList);

      return fmodels;
    },

    filteredList() {
      return this.data.filter(fmodel => {
        return fmodel.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },

  methods: {
    showFeatureModel(featureModel) {
      this.$store.dispatch("featureModel/showFeatureModel", featureModel);
    }
  },

  mounted() {
    this.$store.dispatch(
      "featureModelDatabase/fetchAllFeatureModelsOnDatabase"
    );
  }
};
</script>
