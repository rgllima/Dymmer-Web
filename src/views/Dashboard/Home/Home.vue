<template>
  <div class="home">
    <div
      class="notification"
      style="background-color: #8b88d6; color: white; text-align: justify"
    >
      DyMMer-web tool is an extension of the DyMMer tool in web format to allow
      the modeling, storage and evaluation of the SPLs and DSPLs features models
      from the thresholds of the measures. The tool was developed in JavaScript
      and the code is available on
      <a
        href="https://github.com/dymmerufc/Dymmer-Web"
        target="_blank"
        rel="noopener"
        >GitHub</a
      >. The license DyMMer-web tool is the
      <a
        href="https://opensource.org/licenses/mit-license.php"
        target="_blank"
        rel="noopener"
        >MIT Open Source</a
      >.
    </div>

    <nav class="level">
      <div class="level-item has-text-centered notification is-primary">
        <div v-if="dsplFModels">
          <p class="heading">Feature Models (DSPL)</p>
          <p class="title">{{ dsplFModels }}</p>
        </div>
        <div v-else>
          <b-loading :is-full-page="false" :active="true">
            <b-icon
              pack="fas"
              icon="sync-alt"
              size="is-large"
              custom-class="fa-spin"
            ></b-icon>
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
            <b-icon
              pack="fas"
              icon="sync-alt"
              size="is-large"
              custom-class="fa-spin"
            ></b-icon>
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
            <b-icon
              pack="fas"
              icon="sync-alt"
              size="is-large"
              custom-class="fa-spin"
            ></b-icon>
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
        <div class="tile is-child notification box">
          <p>
            The Federal University of Ceará (Portuguese: Universidade Federal do
            do Ceará, UFC) is a federal university with campuses in the cities
            of Fortaleza, Sobral, Barbalha, Russas, Quixadá and Crateús, in the
            state of Ceará, Brazil. UFC is a public and tuition-free university,
            with several academic programs in most areas of knowledge.
          </p>
        </div>
      </div>
    </div>

    <div class="tile is-ancestor architecture">
      <div class="tile is-parent">
        <div class="tile is-child notification box">
          <div class="has-text-centered">
            <p><strong>Figure 1 - An Dymmer Architecture overview</strong></p>
            <img src="../../../assets/dymmer_architecture.png" alt="logo ufc" />
          </div>
        </div>
      </div>

      <div class="tile is-parent">
        <div class="tile is-child notification box">
          <p>
            <strong>Figure 1</strong> illustrates the DyMMer-web architecture, which is based on
            the Client-Server architectural pattern. The server module was
            developed in JavaScript using the
            <a href="https://nodejs.org/en/" target="_blank">
              NodeJs framework</a
            >
            and the Rest API model for web services. The server is hosted in a
            <a href="https://www.heroku.com/" target="_blank">
              Heroku
            </a>
            and uses a non-relational database (noSQL), document oriented and
            cross platform,
            <a href="https://www.mongodb.com/" target="_blank">
              MongoDB </a
          >.
          </p>

          <p>
            The server is responsible for receiving requests from the client
            module and performing more complex computations such as: i)
            importing and exporting feature models; ii) processing
            maintainability measures; iii) derivation of thresholds from the
            computed measures repository and feature models; and, iv)
            persistence of feature models, maintainability measures and
            thresholds.
          </p>

          <p>
            The client module was implemented in
            <a href="https://vuejs.org/" target="_blank">Vue.js</a>
            , an open source JavaScript framework for the development of SPA
            (Single Page Applications). Also, Bulma
            <a href="https://bulma.io/" target="_blank">Bulma</a>
            was used, an open source CSS framework that is widely compatible
            with current browsers. The site is hosted on
            <a href="https://github.com/dymmerufc/Dymmer-Web" target="_blank">
              Github </a
            >.
          </p>

          <p>
            The client layer is responsible for: i) creating and editing feature
            ii) importing feature models and sending them for processing and
            persistence on the server; iii) creation and management of DSPL
            feature model contexts; and, (iv) management of maintainability
            measures.
          </p>
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
  .architecture
    p
      margin-bottom: 10px
      text-indent: 30px
</style>
