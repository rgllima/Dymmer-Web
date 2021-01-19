<template>
  <div id="feature-model-list box" class="box" style>
    <div v-if="loading" class="loading">
      <b-loading :is-full-page="false" :active="true">
        <b-icon
          pack="fas"
          icon="sync-alt"
          size="is-large"
          custom-class="fa-spin"
        ></b-icon>
      </b-loading>
    </div>

    <div class="notification">
      <h1 class="subtitle is-size-3 has-text-centered">
        Feature Models Repository
      </h1>
    </div>

    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child is-vertical">
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="select">
                  <select v-model="type">
                    <option value="">Filter by Types</option>
                    <option value="SPL">SPL Feature Models</option>
                    <option value="DSPL">DSPL Feature Models</option>
                  </select>
                </div>
              </div>

              <div class="field has-addons" style="flex-grow: unset">
                <div class="control">
                  <a class="button is-static">Type to Search</a>
                </div>
                <div class="control">
                  <input
                    class="input"
                    v-model="search"
                    type="text"
                    placeholder="Find in the repository"
                  />
                </div>
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
              <b-table-column
                field="id"
                label="ID"
                width="40"
                sortable
                numeric
                >{{ props.index + 1 }}</b-table-column
              >
              <b-table-column field="name" label="Feature Name" sortable>
                <a @click="showFeatureModel(props.row)">{{ props.row.name }}</a>
              </b-table-column>
              <b-table-column
                field="type"
                label="Type"
                width="80"
                sortable
                centered
                >{{ props.row.type }}</b-table-column
              >
              <b-table-column
                field="number_of_features"
                label="Nº Features"
                width="120"
                sortable
                centered
              >
                <span class="tag is-success">{{
                  props.row.number_of_features
                }}</span>
              </b-table-column>
              <b-table-column field="creator" label="Creator" sortable>{{
                props.row.creator
              }}</b-table-column>
              <b-table-column
                field="origin"
                label="Origin"
                width="100"
                sortable
                centered
              >
                <span class="tag is-info">{{ props.row.origin }}</span>
              </b-table-column>
              <b-table-column
                field="created"
                label="Created"
                width="100"
                sortable
                centered
              >
                <span class="tag is-warning">{{
                  props.row.date
                    ? new Date(props.row.date).toLocaleDateString()
                    : "Unavailable"
                }}</span>
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
      search: "",
      type: ""
    };
  },

  computed: {
    ...mapGetters({
      splList: "featureModelDatabase/getSplList",
      dsplList: "featureModelDatabase/getDsplList",
      privateList: "featureModelDatabase/getPrivateList",
      loading: "featureModelDatabase/getLoading"
    }),

    data() {
      let fmodels = [];

      const { access } = this.$route.query;

      if (access !== "private") {
        if (this.type)
          this.type.toLocaleUpperCase() === "SPL"
            ? (fmodels = this.splList)
            : (fmodels = this.dsplList);
        else fmodels = [].concat(this.splList, this.dsplList);
      } else {
        fmodels = this.privateList;
      }

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
    this.$store.dispatch(
      "featureModelDatabase/fetchPrivateFeatureModelsOnDatabase"
    );
  }
};
</script>
