<template>
  <div class="select-measures modal-card" ref="element" :closable="false">
    <header class="select-measures--header">
      <p class="subtitle">Select the Measures to Apply</p>
      <div class="select-measures--header-content">
        <p>
          <strong>Feature Type:</strong>
          {{featureModel.type}}
        </p>
        <div class="buttons">
          <div v-if="contexts.length !== 0">
            <span style="margin: 0 5px 10px 0">
              <strong>Select a Context:</strong>
            </span>
            <b-dropdown v-model="selectedContext" aria-role="list">
              <button class="button is-small is-primary" slot="trigger">
                <span>{{`${!selectedContext ? "Context List" : selectedContext}`}}</span>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item
                v-for="(context, index) in contexts"
                aria-role="listitem"
                :value="context.name"
                :key="index"
                @click="selectContext(context.name)"
              >{{context.name}}</b-dropdown-item>
            </b-dropdown>
          </div>
          <button
            class="button select-measures--button is-small"
            @click="applyMeasures"
          >Apply Measures</button>
        </div>
      </div>
    </header>
    <div class="select-measures--list">
      <article>
        <b-checkbox
          :native-value="true"
          v-model="checkAll"
        >{{`${!checkAll ? 'SELECT ALL': 'DESELECT ALL'}`}}</b-checkbox>
      </article>
      <article v-for="(measure, index) in measures" :key="index">
        <b-checkbox
          :id="`checkbox-${measure._id}`"
          :native-value="measure"
          v-model="checkedMeasures"
        >
          <b-tooltip
            :label="measure.description"
            dashed
          >{{ `${measure.initials} - ${measure.name}` }}</b-tooltip>
        </b-checkbox>
      </article>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["contexts"],
  data() {
    return {
      checkedMeasures: [],
      checkboxCustom: "Yes",
      selectedContext: null,
      switchInput: false,
      checkAll: false,
      loadingComponent: null
    };
  },

  watch: {
    checkAll() {
      this.checkedMeasures = [];
      if (this.checkAll)
        this.measures.map(measure => this.checkedMeasures.push(measure));
    }
  },

  computed: {
    ...mapGetters({
      measures: "qualityMeasures/getMeasures",
      featureModel: "featureModel/getFeatureModel"
    })
  },

  methods: {
    async applyMeasures() {
      if (!this.selectedContext && this.featureModel.type === "DSPL") {
        this.showMessage("Please, select a context name!", "is-danger");
        return;
      }

      if (this.checkedMeasures.length === 0) {
        this.showMessage(
          "Please, select at least one measure to calculate!",
          "is-danger"
        );
        return;
      }

      this.loading();
      let data = {};
      data["measures"] = this.checkedMeasures;
      data["featureModel"] = this.featureModel;

      await this.$store.dispatch("qualityMeasures/applyMeasures", data);
      this.loadingComponent.close();
      this.$emit("close");
    },

    selectContext(context) {
      this.$store.commit("featureModel/selectContext", context);
    },

    loading() {
      this.loadingComponent = this.$loading.open({
        container: this.$refs.element
      });
    },

    showMessage(message, color) {
      this.$toast.open({
        message: message,
        type: color
      });
    }
  },

  mounted() {
    console.log("CONTEXT: ", this.featureModel);
  }
};
</script>

<style lang="sass">
@import "../../../../assets/css/colors"
@import "../../../../assets/css/animations"

.modal
  z-index: 100
  min-height: 500px
.animation-content
  padding: 10px
.dropdown
  .button
    width: 150px
    span
      width: 100%
      text-align: left
.select-measures
  width: fit-content
  min-width: 300px
  max-height: 450px
  background-color: white
  position: relative
  z-index: 101
  border-radius: 10px
  &--header
    background-color: white
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)
    color: #4a4a4a
    display: block
    padding: .5rem
    text-align: center
    .subtitle
      margin-bottom: .5rem
    &-content
      width: 100%
      display: inline
      p
        float: left
      .buttons
        float: right
      .button
        margin-right: 10px
  &--list
    padding: 10px
    height: 100%
    -webkit-columns: 2 300px
    -moz-columns: 2 300px
    columns: 2 300px
    -webkit-column-gap: 2em
    -moz-column-gap: 2em
    column-gap: 2em
    -webkit-column-rule: 1px dotted #ddd
    -moz-column-rule: 1px dotted #ddd
    column-rule: 2px dotted #ddd
    overflow: scroll
    article
      margin-bottom: 5px
  &--coulumns
    margin-bottom: 20px
  &--button
    background: $green-save
    animation: pulse 2s infinite
    color: white
  &--button:hover
    color: white
    animation: none
</style>
