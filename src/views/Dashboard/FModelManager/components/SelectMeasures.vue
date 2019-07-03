<template>
  <div class="select-measures modal-card">
    <header class="select-measures--header">
      <p class="subtitle">Select the Measures to Apply</p>
      <div class="select-measures--header-content">
        <p>
          <strong>Feature Type:</strong>
          {{featureModel.type}}
        </p>
        <div class="buttons">
          <b-dropdown v-if="contexts.length !== 0" aria-role="list">
            <button class="button is-small is-warning" slot="trigger">
              <span>Select a Context</span>
              <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item
              v-for="(context, index) in contexts"
              aria-role="listitem"
              :key="index"
            >{{context.name}}</b-dropdown-item>
          </b-dropdown>
          <button class="button is-small is-success" @click="applyMeasures">Apply Measures</button>
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
          <b-tooltip :label="measure.description" dashed>
            {{ `${measure.initials} - ${measure.name}` }}
          </b-tooltip>
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
      switchInput: false,
      checkAll: false
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
      let data = {};
      data["measures"] = this.checkedMeasures;
      data["featureModel"] = this.featureModel;

      await this.$store.dispatch("qualityMeasures/applyMeasures", data);
      this.$emit("close");
    }
  },

  mounted() {
    console.log("CONTEXT: ", this.contexts);
  }
};
</script>

<style lang="sass">
.modal
  z-index: 100
  min-height: 500px
.animation-content
  padding: 10px
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
</style>
