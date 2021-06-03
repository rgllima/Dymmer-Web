<template>
  <b-modal :active="active" :width="300" :can-cancel="false">
    <div class="box">
      <div class="field">
        <label class="label has-text-centered">Type the Text</label>
        <div class="control">
          <label for="agent-name"></label>
          <input
            class="input"
            type="text"
            id="agent-name"
            placeholder="Type the text..."
            @keyup.enter="action"
            v-model="name"
          />
        </div>
      </div>
      <div class="field is-grouped">
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
            Create
          </button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "InputModal",

  props: {
    active: Boolean
  },

  data() {
    return {
      name: ""
    };
  },

  methods: {
    action() {
      this.$emit("action", this.name);
      this.$emit("close");
      this.name = "";
    }
  }
};
</script>

<style scoped></style>
