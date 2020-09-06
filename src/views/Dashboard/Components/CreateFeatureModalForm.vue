<template>
  <div class="create-feature-modal modal-card box">
    <div class="subtitle has-text-centered">
      <h1>Feature Informations</h1>
      <p class="help is-danger">Red fields are required!</p>
    </div>

    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">Feature Model Name</label>
          <p class="control is-expanded">
            <input
              class="input"
              :class="[!fModel.name.trim().length ? 'is-danger' : 'is-success']"
              type="text"
              placeholder="Feature Model Name"
              v-model="fModel.name"
              required
            />
          </p>
        </div>
        <div class="field">
          <label class="label">Author</label>
          <p class="control is-expanded">
            <input
              class="input"
              :class="[!fModel.creator.trim().length ? 'is-danger' : 'is-success']"
              type="text"
              placeholder="Author"
              v-model="fModel.creator"
              required
            />
          </p>
        </div>
      </div>
    </div>

    <div class="field">
      <div class="field">
        <label class="label">Description</label>
        <p class="control is-expanded">
          <textarea
            class="textarea"
            :class="[
              !fModel.description.trim().length ? 'is-danger' : 'is-success'
            ]"
            placeholder="Write a brief description of the Feature Model..."
            v-model="fModel.description"
            required
          ></textarea>
        </p>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">Email</label>
          <p class="control is-expanded">
            <input
              class="input "
              :class="[
                !validateEmail(fModel.email) ? 'is-danger' : 'is-success'
              ]"
              type="email"
              placeholder="Email"
              v-model="fModel.email"
              required
            />
          </p>
        </div>
        <div class="field">
          <label class="label">Phone</label>
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="Phone" v-model="fModel.phone" />
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">Address</label>
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="Address" v-model="fModel.address" />
          </p>
        </div>
        <div class="field">
          <label class="label">Website</label>
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="Website" v-model="fModel.website" />
          </p>
        </div>
      </div>
    </div>

    <div class="field is-vertical">
      <div class="field">
        <label class="label">Organization</label>
        <p class="control is-expanded">
          <input class="input" type="text" placeholder="Organization" v-model="fModel.organization" />
        </p>
      </div>
      <div class="field">
        <label class="label">Department</label>
        <p class="control is-expanded">
          <input class="input" type="text" placeholder="Department" v-model="fModel.department" />
        </p>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <p class="control">
        <a class="button is-danger" @click="$emit('close')">Cancel</a>
      </p>
      <p class="control">
        <button
          :class="{ 'is-loading': loading }"
          class="button is-primary"
          @click="createFModel"
        >
          Create Feature Model
        </button>
      </p>
    </div>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      loading: false,
      fModel: {
        name: "",
        description: "",
        creator: "",
        address: "",
        email: "",
        phone: "",
        website: "",
        organization: "",
        department: "",
        date: new Date().toISOString(),
        reference: "",
        feature_tree: [
          {
            id: "_r",
            type: "r",
            name: "",
            children: []
          }
        ],
        constraints: [],
        contexts: [],
        origin: "DYMMER",
        type: "SPL",
        number_of_features: 0
      }
    };
  },

  methods: {
    async createFModel() {
      if (!this.loading) {
        console.log(this.fModel);
        let hasIssues = this.validateFModel();

        if (hasIssues) return this.notifyUser(hasIssues);

        this.fModel.feature_tree[0].name = this.fModel.name;

        this.loading = true;
        await this.$store.dispatch(
          "featureModel/createFeatureModelOnDatabase",
          this.fModel
        );
        this.loading = false;
        this.$emit("close");
      }
    },

    validateFModel() {
      if (!this.fModel.name.trim())
        return "Field 'Feature Model Name' is required!";
      else if (!this.fModel.creator.trim())
        return "Field 'Author' is required!";
      else if (!this.fModel.description.trim())
        return "Field 'Description' is required!";
      else if (!this.fModel.email.trim()) return "Field 'Email' is required!";
      else if (!this.validateEmail(this.fModel.email))
        return "Field 'Email' is invalid!";
      return false;
    },

    validateEmail(email) {
      let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(email);
    },

    notifyUser(message) {
      this.$toast.open({
        message: message,
        type: "is-danger"
      });
    }
  },

  mounted() {
    console.log(this.fModel);
  }
};
</script>

<style lang="sass">
.modal
  z-index: 100
.animation-content
  min-height: 300px
.create-feature-modal
  overflow-y: scroll
  .control
    textarea
      max-height: 80px
      min-height: 80px
      resize: none
  .modal-card
    padding: 10px
  .button
    margin-bottom: 10px
</style>
