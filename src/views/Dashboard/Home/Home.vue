<template>
  <div class="home box">
    <!-- <div class="tile is-vertical is-ancestor"> -->
    <nav class="level">
      <div class="level-item has-text-centered notification is-primary">
        <div>
          <p class="heading">Feature Models (DSPL)</p>
          <p class="title">{{dsplFModels}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered notification is-primary">
        <div>
          <p class="heading">Feature Models (SPL)</p>
          <p class="title">{{splFModels}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered notification is-primary">
        <div>
          <p class="heading">Quality Measures</p>
          <p class="title">{{measures}}</p>
        </div>
      </div>
      <!-- <div class="level-item has-text-centered">
        <div>
          <p class="heading">Likes</p>
          <p class="title">789</p>
        </div>
      </div>-->
    </nav>
    <!-- </div> -->
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
      dsplList: "featureModelDatabase/getDsplList",
      measureDatabase: "qualityMeasures/getMeasures"
    }),

    splFModels() {
      return this.splList.length;
    },

    dsplFModels() {
      return this.dsplList.length;
    },

    measures() {
      return this.measureDatabase.length;
    }
  },

  methods: {
    loading(component) {
      this.loadingComponent = this.$loading.open({
        container: this.$refs.element
      });
    }
  },

  mounted() {
    this.$store.dispatch("featureModelDatabase/fetchAllFeatureModelsOnDatabase");
    this.$store.dispatch("qualityMeasures/fetchMeasuresOnDatabase");
  }
};
</script>

<style lang="sass">
.home
  max-width: 100%
  padding: 25px 10px
  width: 100%
  box-sizing: border-box
  .level
    .notification
      margin: 5px
</style>
