<template>
  <section id="apply-measures-modal">
    <template>
      <div class="card">
        <header class="card-header">
          <div class="card-header-title">
            <p>Select Measures</p>
          </div>
        </header>
        <div class="card-content">
          <div class="content">
            <!-- <div class="field">
              <b-checkbox>Select All</b-checkbox>
            </div> -->
            <div class="field" v-for="(measure, index) in measures" :key="index">
              <b-checkbox
                :id="`checkbox-${measure._id}`"
                :native-value="measure"
                v-model="checkedMeasures"
              >
                <b-tooltip :label="measure.description" dashed>{{ `${measure.initials} - ${measure.name}` }}</b-tooltip>
              </b-checkbox>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Cancel</a>
          <a href="#" class="card-footer-item" @click="applyMeasures">Apply Measures</a>
        </footer>
      </div>
    </template>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["featureModel"],
  data() {
    return {
      checkedMeasures: [],
      checkbox: false,
      checkboxCustom: "Yes",
      switchInput: false
    };
  },

  computed: {
    ...mapGetters({
      measures: "qualityMeasures/getMeasuresModel",
      featureTree: "featureModel/getFeatureModel"
    })
  },

  methods: {
    async applyMeasures() {
      let obj = {};
      obj["measures"] = this.checkedMeasures;
      obj["featureTree"] = this.featureTree._id;

      await this.$store.dispatch("qualityMeasures/calculateSelectedMeasures", obj);
      this.$emit("close");
    },
    toggleSwitchs(value) {
      this.switchInput = value;

      let switchs = document.getElementsByClassName("switch");
      for (const obj of switchs) {
        if (value) obj.setAttribute("checked", value);
        else obj.removeAttribute("checked");
      }
    }
  },

  mounted() {
    this.$store.dispatch("qualityMeasures/fetchMeasuresOnDatabase");
    // console.log(this.$refs, this.measures, this.featureTree.feature_tree[0]);
  }
};
</script>

<style lang="sass" >
.animation-content
  overflow: scroll
#apply-measures-modal
  min-width: 300px
  background-color: white
  position: relative
  z-index: 50
  padding: 10px 20px
  border-radius: 10px
  .content
    margin-top: 20px
    .field
      margin-bottom: 20px
      .measures
        margin-top: 5px
    .buttons
      display: inherit
</style>
