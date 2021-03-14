<template>
  <div class="link-feature-modal">
    <b-modal :active="active" :width="300" :can-cancel="false">
      <div class="box" style="padding: 15px;">
        <h5 class="has-text-centered">Linking Agents</h5>

        <div class="box">
          <b-dropdown v-model="agent" aria-role="list">
            <template #trigger="{ activeDp1 }">
              <b-button
                :label="agent.name || 'Select the Agent'"
                type="is-light"
                :icon-right="activeDp1 ? 'menu-up' : 'menu-down'"
              />
            </template>

            <b-dropdown-item
              v-for="ctxAgent in contextAgents"
              aria-role="listitem"
              :key="ctxAgent.id"
              :value="ctxAgent"
              >{{ ctxAgent.name }}</b-dropdown-item
            >
          </b-dropdown>
        </div>

        <div class="box">
          <b-dropdown v-model="context" aria-role="list">
            <template #trigger="{ activeDp2 }">
              <b-button
                :label="context.name || 'Select the Context'"
                type="is-light"
                :icon-right="activeDp2 ? 'menu-up' : 'menu-down'"
              />
            </template>

            <b-dropdown-item
              v-for="ctx in agent.contexts"
              aria-role="listitem"
              :key="ctx.id"
              :value="ctx"
              >{{ ctx.name }}</b-dropdown-item
            >
          </b-dropdown>
        </div>

        <div class="box">
          <b-dropdown v-model="state" aria-role="list">
            <template #trigger="{ activeDp3 }">
              <b-button
                :label="state.name || 'Select the State'"
                type="is-light"
                :icon-right="activeDp3 ? 'menu-up' : 'menu-down'"
              />
            </template>

            <b-dropdown-item
              v-for="state in context.states"
              aria-role="listitem"
              :key="state.id"
              :value="state"
              >{{ state.name }}</b-dropdown-item
            >
          </b-dropdown>
        </div>

        <div class="field is-grouped" style="margin-top: 20px">
          <div class="control" style="width: 50%; margin: 0">
            <button
              class="button is-danger is-link is-inverted"
              @click="$emit('close')"
            >
              Cancel
            </button>
          </div>
          <div class="control" style="width: 50%;margin: 0; text-align: right">
            <button class="button is-success is-inverted" @click="action">
              Link
            </button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "LinkFeatureModal",
  props: {
    active: Boolean,
    contextAgents: Array
  },
  data() {
    return {
      agent: { contexts: [] },
      context: { states: [] },
      state: {}
    };
  },
  methods: {
    action() {
      const { id } = this.context;
      const { value } = this.state;

      if (!id || !value) return;

      this.$emit("action", { address: id, value });
      this.$emit("close");
      this.resetState();
    },
    resetState() {
      this.agent = { contexts: [] };
      this.context = { states: [] };
      this.state = {};
    }
  }
};
</script>

<style scoped></style>
