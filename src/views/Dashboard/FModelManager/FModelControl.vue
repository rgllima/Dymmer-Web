<template>
  <div class="fmodel-status box">
    <div class="tile">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
          <div>
            <h1>{{featureModel.name}}</h1>
            <!-- <input class="input" type="text"> -->
          </div>
          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <a aria-haspopup="true" aria-controls="dropdown-menu">
                <span>FILE</span>
              </a>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">Itens</a>
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
            <button class="button fmodel-status--save-btn" @click="saveFeatureModel">Save Model</button>
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
      featureModelControl: {}
    };
  },

  computed: {
    ...mapGetters({
      featureModel: "featureModel/getFeatureModel",
      featureModelChanged: "featureModel/getHasChanged"
    })
  },

  methods: {
    saveFeatureModel() {
      this.$store.dispatch("featureModel/saveFeatureModelOnDatabase");
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
