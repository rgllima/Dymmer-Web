<template>
  <div class="fmodel">
    <div class="fmodel--status">
      <fmodel-control @setLoading="setLoading" />
    </div>

    <div v-if="loading" class="loading">
      <b-loading :is-full-page="false" :active="true">
        <b-icon
          pack="fas"
          icon="sync-alt"
          size="is-large"
          custom-class="fa-spin"
        ></b-icon>
      </b-loading>
    </div>

    <div v-else class="content">
      <div class="fmodel--tabs">
        <b-tabs class="fmodel-tabs" type="is-boxed" expanded>
          <b-tab-item
            class="fmodel-item"
            label="Feature Editor"
            icon-pack="fas"
            icon="edit"
          >
            <feature-editor />
          </b-tab-item>
          <b-tab-item
            class="fmodel-item"
            label="Context Manager"
            icon-pack="fas"
            icon="align-justify"
          >
            <context-manager />
          </b-tab-item>
          <b-tab-item
            class="fmodel-item"
            label="Apply Measures"
            icon-pack="fas"
            icon="square-root-alt"
          >
            <apply-measures />
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureEditor from "./FeatureEditor";
import ContextManager from "./ContextManager";
import ApplyMeasures from "./ApplyMeasures";
import FModelControl from "./FModelControl";
import { mapGetters } from "vuex";

export default {
  components: {
    "context-manager": ContextManager,
    "feature-editor": FeatureEditor,
    "apply-measures": ApplyMeasures,
    "fmodel-control": FModelControl
  },

  data: () => ({
    loading: true
  }),

  computed: {
    ...mapGetters({
      featureModel: "featureModel/getFeatureModel",
      error: "featureModel/getError"
    })
  },

  watch: {
    error() {
      if (this.error)
        this.$toast.open({
          message: this.error,
          type: "is-danger"
        });
      this.$store.commit("featureModel/setError", null);
    }
  },

  methods: {
    async fetchFeatureModel(id) {
      console.log(id);
      await this.$store.dispatch(
        "featureModel/fetchFeatureModelOnDatabase",
        id
      );

      if (this.featureModel.feature_tree.length === 0) {
        this.$router.push("/home");
      }
      this.loading = false;
    },

    setLoading(value) {
      this.loading = value;
    }
  },

  mounted() {
    let { id } = this.$route.params;

    if (this.featureModel.feature_tree.length === 0) {
      this.fetchFeatureModel(id);
    } else {
      this.loading = false;
    }
  }
};
</script>

<style lang="sass">
.fmodel
  max-height: 100%
  width: 100%
  margin: 0 auto
  &-tabs
    .tab-content
      padding: 0
      border-left: #dbdbdb solid .1rem
      border-right: #dbdbdb solid .1rem
      border-bottom: #dbdbdb solid .1rem
      border-radius: 0 0 4px 4px
  &-item
    background: white
    padding: .8rem
</style>
