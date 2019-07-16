<template>
  <section class="content">
    <div class="card">
      <div class="card-title">
        <h3>Add Feature Model</h3>
      </div>
      <div class="card-content">
        <div v-if="!isLoading" class="tile">
          <div class="tile is-parent">
            <button class="box button" @click="createFeatureModel">
              <img src="../../../assets/edit-tools.svg" alt="settings" />
              <br />
              <p class="has-text-centered">Create Feature Model</p>
            </button>
          </div>
          <div class="tile is-parent">
            <button class="box button">
              <img src="../../../assets/import.svg" alt="settings" />
              <br />
              <p class="has-text-centered">Import XML</p>
              <input
                class="file-input"
                type="file"
                name="xmlString"
                id="getXmlToString"
                ref="MyXMLFile"
                @change="getXmlToString"
              />
            </button>
          </div>
        </div>

        <div v-else class="card-animation">
          <lottie :options="defaultOptions" :height="220" :width="220" />
          <h4>Converting!</h4>
          <p>Wait a moment...</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Lottie from "vue-lottie";
import * as animationData from "@/assets/search-file-animation.json";
import CreateFeatureModel from "./CreateFeatureModalForm";

export default {
  components: {
    Lottie
  },

  data: () => ({
    isLoading: false,
    defaultOptions: { animationData: animationData.default }
  }),

  methods: {
    getXmlToString(ev) {
      this.isLoading = true;
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = async e => {
        await this.$store.dispatch("featureModel/convertXmlToJson", e.target.result);
        this.$emit("close");
      };
      reader.readAsText(file);
    },

    createFeatureModel() {
      this.$modal.open({
        parent: this,
        component: CreateFeatureModel,
        hasModalCard: true
      });
      this.$emit("close");
    }
  }
};
</script>


<style lang="sass" scoped>
.card
  min-width: 300px
  border-radius: 10px
  text-align: center
  overflow: hidden
  &-title
    height: 50px
    padding: 10px
    background: #3333662e
  &-content
    .box
      width: 180px
      height: 220px
      background: whitesmoke
      p
        font-size: 1rem
        margin-top: 10px
  &-animation
    h4
      margin: 3px 0
    p
      font-size: 0.9rem
</style>
