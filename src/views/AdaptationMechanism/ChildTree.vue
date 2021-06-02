<template>
  <div class="child-tree">
    <div class="box item-box" v-for="(feature, i) in tree" :key="i">
      <div class="is-flex w-100-p">
        <p class="separator">{{ generateSeparators() }}</p>

        <div
          class="box is-flex feature w-100-p"
          :class="{ active: feature.value }"
        >
          <h5>{{ feature.name }}</h5>
          <b-icon
            v-if="!feature.children.length && simulating"
            pack="fas"
            icon="power-off"
            size="is-small"
          />
          <button
            v-if="!feature.children.length && !simulating"
            class="button is-small is-primary"
            @click="linkAgent(feature.id)"
          >
            Link Agent
          </button>
        </div>
      </div>

      <div
        class="dependencies"
        v-for="state in feature.states.filter(e => e.name === 'On')"
        :key="state.name"
      >
        <div v-if="state.requires.length">
          <p>Dependency [Required Status]</p>

          <div
            class="dependency"
            v-for="dependency in state.requires"
            :key="dependency.address"
          >
            <p :class="getClassSatisfyingDependency(dependency)">
              <span>{{ getNameFromDictionary(dependency.address) }}</span>
              <span> [{{ dependency.value ? " ON " : "OFF" }}]</span>
            </p>

            <a
              v-if="!simulating && dependency.address.startsWith('ca')"
              @click="$emit('unlinkFeature', dependency.address)"
            >
              <b-icon
                class="has-text-danger"
                pack="fas"
                icon="trash"
                size="is-small"
              />
            </a>
          </div>
        </div>
      </div>

      <ChildTree
        :simulating="simulating"
        :tree="feature.children"
        :level="level + 1"
        :dictionary="dictionary"
        @startLinking="startLinking"
        @unlinkFeature="$emit('unlinkFeature', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ChildTree",
  props: {
    tree: Array,
    level: Number,
    simulating: Boolean,
    dictionary: Object
  },
  methods: {
    linkAgent(featureId) {
      this.$emit("startLinking", featureId);
    },

    startLinking(payload) {
      this.$emit("startLinking", payload);
    },

    getNameFromDictionary(id = "") {
      if (id.startsWith("ca")) return this.dictionary.context_agents[id].name;
      return this.dictionary.features[id].name;
    },

    getClassSatisfyingDependency({ address, value }) {
      let name = "";
      const { features, context_agents } = this.dictionary;

      if (this.simulating) name = "simulating";

      if (address.startsWith("ca")) {
        console.log(context_agents[address].ref.value);
        name += context_agents[address].ref.value === value ? "__active" : "";
      } else {
        console.log(features[address].ref.value);
        name += features[address].ref.value === value ? "__active" : "";
      }

      return name;
    },

    generateSeparators() {
      if (this.level === 1) return "";

      const array = new Array(this.level * 4);
      let separator = "";

      for (let i = 0; i < array.length; i++) {
        separator += "_";
      }

      return separator;
    }
  }
};
</script>

<style lang="scss" scoped>
.child-tree {
  h5,
  p {
    margin: 0;
  }

  .item-box {
    position: relative;
  }

  .dependencies {
    text-align: right;
    font-size: 0.8rem;
  }

  .dependency {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    p {
      margin-right: 5px;
    }

    .simulating {
      color: red;
      &__active {
        color: green;
      }
    }
  }

  .w-100-p {
    width: 100%;
  }

  .separator {
    margin-right: 5px;
  }

  .feature {
    justify-content: space-between;
    align-items: center;
    color: #ff6666;
    margin-bottom: 5px;
  }

  .active {
    .icon {
      color: #008000 !important;
    }
  }
}
</style>
