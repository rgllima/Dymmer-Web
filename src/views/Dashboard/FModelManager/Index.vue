<template>
  <div class="fmodel">
    <b-tabs class="fmodel-tabs" type="is-boxed" expanded>
      <b-tab-item class="fmodel-item" label="Feature Editor" icon-pack="fas" icon="edit">
        <feature-editor/>
      </b-tab-item>
      <b-tab-item class="fmodel-item" label="Context Manager" icon-pack="fas" icon="align-justify">
        <context-manager/>
      </b-tab-item>
      <b-tab-item class="fmodel-item" label="Apply Measures" icon-pack="fas" icon="square-root-alt">
        <h1>Dymmer 3</h1>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import FeatureEditor from './FeatureEditor'
import ContextManager from './ContextManager'

export default {
  components: {
    'context-manager': ContextManager,
    'feature-editor': FeatureEditor
  },

  data: () => ({}),
};
</script>

<style lang="sass">
.fmodel
  width: calc(100% - 40px)
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
