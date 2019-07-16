<template>
  <div class="home">
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
      featureModelDatabase: "featureModelDatabase/getFeatureModelDatabase",
      measureDatabase: "qualityMeasures/getMeasures"
    }),

    splFModels() {
      return this.featureModelDatabase.filter(fModel => {
        return fModel.type === "SPL";
      }).length;
    },

    dsplFModels() {
      return this.featureModelDatabase.filter(fModel => {
        return fModel.type === "DSPL";
      }).length;
    },

    measures() {
      return this.measureDatabase.length;
    }
  },

//   watch: {
//     measureDatabase() {
//       console.log("HOME: ", this.measureDatabase);
//     }
//   },

  methods: {
    loading(component) {
      this.loadingComponent = this.$loading.open({
        container: this.$refs.element
      });
    }
  },

  mounted() {
    this.$store.dispatch("featureModelDatabase/fetchFeatureModelsOnDatabase");
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
