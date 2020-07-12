<template>
  <div class="fmodel-status box">
    <div class="tile">
      <div class="tile is-ancestor">
        <div class="tile fmodel-status--img" @click="back">
          <img src="../../../assets/left-arrow.svg" alt="arrow">
        </div>
        <div class="tile is-parent is-vertical">
          <div class="tile">
            <h1><strong>Title: </strong>{{featureModel.name}}</h1>
            <!-- <input class="input" type="text"> -->
          </div>
          <div class="tile">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <a aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>FEATURE MODEL</span>
                </a>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <p
                    v-if="dsplFeatureModel"
                    class="dropdown-item"
                    @click="exportFMToXMLWithContexts"
                  >
                    Export to XML With Contexts
                  </p>
                  <p
                    class="dropdown-item"
                    @click="exportFMToXMLWithoutContexts"
                  >
                    Export to XML Without Contexts
                  </p>
                </div>
              </div>
            </div>

            <div class="dropdown is-hoverable" v-if="computedMeasures.length">
              <div class="dropdown-trigger">
                <a aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>EXPORT MEASURES</span>
                </a>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <p class="dropdown-item" @click="exportMeasuresToCSV">
                    Export Result to CSV
                  </p>
                  <p class="dropdown-item" @click="exportMeasuresToPDF">
                    Export Result to PDF
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="fmodel-status--changes" v-if="!featureModelChanged">
            <p class>All changes are saved</p>
            <button class="button is-primary" disabled>Saved</button>
          </div>
          <div class="fmodel-status--changes" v-else>
            <p>There are unsaved changes</p>
            <button
              :class="{ 'is-loading': saving }"
              class="button fmodel-status--save-btn"
              @click="saveFeatureModel"
            >
              Save Model
            </button>
          </div>
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
      saving: false,
      featureModelControl: {}
    };
  },

  computed: {
    ...mapGetters({
      featureModel: "featureModel/getFeatureModel",
      featureModelChanged: "featureModel/getHasChanged",
      computedMeasures: "qualityMeasures/getGroupedMeasuresThresholds"
    }),
    dsplFeatureModel() {
      return this.featureModel?.type === 'DSPL'
    }
  },

  methods: {
    async saveFeatureModel() {
      if (!this.saving) {
        this.saving = true;
        await this.$store.dispatch("featureModel/updateFeatureModelOnDatabase");
        this.saving = false;
      }
    },

    async exportFMToXMLWithoutContexts() {
      this.$emit("setLoading", true);
      await this.$store.dispatch("featureModel/exportFMToXML", false);
      this.$emit("setLoading", false);
    },

    async exportFMToXMLWithContexts() {
      this.$emit("setLoading", true);
      await this.$store.dispatch("featureModel/exportFMToXML", true);
      this.$emit("setLoading", false);
    },

    async exportMeasuresToCSV() {
      this.$emit("setLoading", true);
      await this.$store.dispatch("qualityMeasures/exportMeasuresToCSV");
      this.$emit("setLoading", false);
    },

    async exportMeasuresToPDF() {
      this.$emit("setLoading", true);
      await this.$store.dispatch("qualityMeasures/exportMeasuresToPDF");
      this.$emit("setLoading", false);
    },

    back() {
      this.$router.go(-1);
    }
  }
};
</script>


<style lang="sass" scoped>
@import "../../../assets/css/colors"
@import "../../../assets/css/animations"

.fmodel-status
  background: white
  border-radius: 5px
  padding: 5px 10px
  margin-bottom: 5px
  box-sizing: border-box
  max-height: 56px
  .dropdown
    margin-top: 4px
    span
      font-size: .85rem
    .dropdown-item
      cursor: pointer
      width: 250px
      &:hover
        background-color: #f5f5f5
  &--img
    margin-top: 7px
    margin-left: 2px
    background: #333366
    max-width: 40px
    position: relative
    display: block
    max-height: 56px
    padding-top: 8px
    cursor: pointer
    border-radius: 5px 0 0 5px
  &--changes
    display: flex
    justify-content: flex-end
    width: 100%
    align-items: center
    p
      align-self: flex-end
      margin-right: 15px
      margin-bottom: 5px
      color: #848484
      text-decoration: underline
  &--save-btn
    background: $green-save
    color: white
    border-color: #008080
    animation: pulse 2s infinite
</style>
