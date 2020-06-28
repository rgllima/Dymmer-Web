<template>
  <div class="home">
    <div class="notification" style="background-color: #8b88d6; color: white">
      Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum
      dolor.
      <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec
      nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus
      diam, et dictum
      <a>felis venenatis</a> efficitur. Sit amet, consectetur
      adipiscing elit
    </div>

    <nav class="level">
      <div class="level-item has-text-centered notification is-primary">
        <div v-if="dsplFModels">
          <p class="heading">Feature Models (DSPL)</p>
          <p class="title">{{ dsplFModels }}</p>
        </div>
        <div v-else>
          <b-loading :is-full-page="false" :active="true">
            <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"></b-icon>
          </b-loading>
        </div>
      </div>

      <div class="level-item has-text-centered notification is-primary">
        <div v-if="splFModels">
          <p class="heading">Feature Models (SPL)</p>
          <p class="title">{{ splFModels }}</p>
        </div>
        <div v-else>
          <b-loading :is-full-page="false" :active="true">
            <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"></b-icon>
          </b-loading>
        </div>
      </div>

      <div class="level-item has-text-centered notification is-primary">
        <div v-if="measures">
          <p class="heading">Quality Measures</p>
          <p class="title">{{ measures }}</p>
        </div>
        <div v-else>
          <b-loading :is-full-page="false" :active="true">
            <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"></b-icon>
          </b-loading>
        </div>
      </div>
    </nav>

    <div class="tile is-ancestor">
      <div class="tile is-3 is-parent">
        <div class="tile is-child notification box">
          <div class="institucional">
            <p><strong>A survey by</strong></p>
            <img src="../../../assets/logo_ufc.png" alt="logo ufc" />
          </div>
        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile is-child notification box"></div>
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
    loading() {
      this.loadingComponent = this.$loading.open({
        container: this.$refs.element
      });
    }
  },

  mounted() {
    this.$store.dispatch(
      "featureModelDatabase/fetchAllFeatureModelsOnDatabase"
    );
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
      margin: 0px
      margin-bottom: 5px

    .notification:not(:last-child)
      margin-right: 5px

    .level-item
      height: 95px
      min-width: 33%

  .institucional
    text-align: center
    img
      max-height: 60px
</style>
