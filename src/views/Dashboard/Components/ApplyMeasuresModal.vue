<template>
  <section id="apply-measures-modal">
    <div class="content">
      <p class="subtitle">Select Measures</p>
      <div class="field">
        <div v-if="!switchInput" class="measures">
          <input id="check1" type="checkbox" name="check1" class="switch is-rounded" @click="toggleSwitchs(true)">
          <label for="check1"> Select All </label>
        </div>
        <div v-else class="measures">
          <input id="check1" type="checkbox" name="check1" class="switch is-rounded" @click="toggleSwitchs(false)">
          <label for="check1"> Deselect All </label>
        </div>
        <div class="measures" v-for="measure in measures" :key="measure._id">
          <input :id="measure._id" type="checkbox" :name="measure.name" class="switch is-rounded">
          <label :for="measure._id">
            <b-tooltip :label="measure.description" dashed>{{measure.name}}</b-tooltip>
          </label>
        </div>
      </div>
      <div class="buttons">
        <button class="button is-danger is-small" @click="() => this.$emit('close')">Cancel</button>
        <button
          class="button is-success is-small"
          style="float: right"
        >Apply Measures</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["featureModel"],
  data() {
    return {
      switchInput: false,
      measures: [
        {
          _id: 1323,
          name: 'Number of Features',
          description: "Number of all features"
        },
        {
          _id: 2312,
          name: 'Number of XOR Features',
          description: "testando esse aqui"
        },
        {
          _id: 2343,
          name: 'Number of Grouped Features',
          description: "outro teste sendo realizado"
        },
        {
          _id: 2892,
          name: 'Number of NOT Leaf Features',
          description: "Rapaz, mais um teste"
        },
        {
          _id: 2902,
          name: 'Branching Factor',
          description: "Ok"
        }
      ]
    };
  },

  methods: {
    toggleSwitchs(value) {
      this.switchInput = value;

      let switchs = document.getElementsByClassName('switch');
      for (const obj of switchs) {
        if (value) obj.setAttribute('checked', value);
        else obj.removeAttribute('checked')
      }
    }
  },

  mounted() {
    console.log(this.$refs);
  }
};
</script>

<style lang="sass" scoped>
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
