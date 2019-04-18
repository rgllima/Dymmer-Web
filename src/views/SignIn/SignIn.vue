<template>
  <div id="dymmer-modal">
    <form action>
      <div class="modal-card" style="width: auto">
        <div id="content" class="tile is-ancestor">
          <div class="tile is-parent">
            <div id="dymmer-tile-left" class="tile is-child">
              <div id="dymmer-content">
                <h1
                  class="subtitle dymmer-title"
                >Manage your features models and extract quality measures in a modern dashboard</h1>
                <img id="dymmer-rocket-img" src="../../assets/project.svg" alt="project">
              </div>
            </div>
          </div>
          <div class="tile is-parent">
            <div id="dymmer-tile-right" class="tile is-child">
              <section class="modal-card-body" style="background-color: transparent">
                <div>
                  <div class="field has-addons">
                    <p class="control">
                      <a
                        id="dymmer-signin-button"
                        class="button is-small"
                        :class="[!show ? 'is-blackblue': '', 'is-success']"
                        @click="show = true"
                      >Sign In</a>
                    </p>
                    <p class="control">
                      <a
                        id="dymmer-signup-button"
                        class="button is-small"
                        :class="[show ? 'is-blackblue': '', 'is-success']"
                        @click="show = false"
                      >Sign Up</a>
                    </p>
                  </div>
                </div>
                <transition name="fade" mode="out-in">
                  <div v-if="show" id="dymmer-signin" key="dymmer-signin">
                    <div id="dymmer-subtitle">
                      <h1 class="subtitle has-text-white has-text-centered">Sign In</h1>
                    </div>
                    <div class="field">
                      <div class="control has-text-white">
                        <label for="email">Email</label>
                        <input
                          v-model="user.email"
                          class="input dymmer-input"
                          type="text"
                          placeholder="Your Email"
                        >
                      </div>
                    </div>
                    <div class="field">
                      <div class="control has-text-white">
                        <label for="password">Password</label>
                        <input
                         v-model="user.password"
                          class="input dymmer-input"
                          type="password"
                          placeholder="Your Password"
                        >
                      </div>
                    </div>
                    <div class="buttons" style="margin-top: 20px;">
                      <a
                        ref="signinButton"
                        class="button is-success is-rounded"
                        style="font-size: 0.75rem"
                        @click="signIn"
                      >Sign In</a>
                      <a
                        style="font-size: 0.75rem; color: #8e99a8;text-decoration: underline;"
                        @click="show = false"
                      >I'm not member</a>
                    </div>
                  </div>
                  <div v-if="!show" id="dymmer-signup" key="dymmer-signup">
                    <div id="dymmer-subtitle">
                      <h1 class="subtitle has-text-white has-text-centered">Sign Up</h1>
                    </div>
                    <div class="field">
                      <div class="control has-text-white">
                        <label for="name">Your Name</label>
                        <input
                          v-model="user.name"
                          class="input dymmer-input"
                          type="text"
                          placeholder="Your Name"
                        >
                      </div>
                    </div>
                    <div class="field">
                      <div class="control has-text-white">
                        <label for="email">Email</label>
                        <input
                          v-model="user.email"
                          class="input dymmer-input"
                          type="text"
                          placeholder="Your Email"
                        >
                      </div>
                    </div>
                    <div class="field">
                      <div class="control has-text-white">
                        <label for="password">Password</label>
                        <input
                          v-model="user.password"
                          class="input dymmer-input"
                          type="password"
                          placeholder="Your Password"
                        >
                      </div>
                    </div>
                    <div class="field" style="color: white">
                      <b-checkbox size="is-small" type="is-success">
                        I agree to the
                        <a href="#" style="color: #23d160">terms and conditions</a>
                      </b-checkbox>
                    </div>
                    <div class="buttons" style="margin-top: 20px;">
                      <a
                        ref="signupButton"
                        class="button is-success is-rounded"
                        style="font-size: 0.75rem"
                        @click="signUp"
                      >Sign Up</a>
                      <a
                        style="font-size: 0.75rem; color: #8e99a8;text-decoration: underline;"
                        @click="show = true"
                      >I'm already member</a>
                    </div>
                  </div>
                </transition>
              </section>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['hasAccount'],
  data() {
    return {
      show: this.hasAccount,
      user: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async signIn() {
      if (!this.user.email)
        return;
      if(!this.user.password)
        return;

      this.$refs.signinButton.classList.add("is-loading");
      await this.$store.dispatch("authentication/signIn", this.user)

      if(this.error) {
        this.$toast.open({
          message: `${this.error}`,
          type: 'is-danger'
        })
        this.$store.commit('authentication/setError', null)
        this.$refs.signinButton.classList.remove("is-loading")
      } else {
        this.$toast.open({
          message: `Success`,
          type: 'is-success'
        })
        this.$emit("close")
        this.$router.push('/dashboard')
      }
    },
    async signUp() {
      if (!this.user.name)
        return;
      if (!this.user.email)
        return;
      if(!this.user.password)
        return;

      this.$refs.signupButton.classList.add("is-loading");
      await this.$store.dispatch("authentication/signUp", this.user)

      if(this.error) {
        this.$toast.open({
          message: `${this.error}`,
          type: 'is-danger'
        })
        this.$store.commit('authentication/setError', null)
        this.$refs.signinButton.classList.remove("is-loading")
      } else {
        this.$toast.open({
          message: `Success`,
          type: 'is-success'
        })
      }
    }
  },
  computed: {
    error() {
      return this.$store.state.authentication.error;
    }
  }
};
</script>

<style lang="scss" scoped>
#dymmer-modal {
  .modal-card {
    padding: 20px;
  }
  .tile.is-parent {
    padding: 0;
  }
  .tile.is-child {
    max-width: 350px;
    min-height: 500px;
  }

  #dymmer-tile-left {
    #dymmer-content {
      background-color: #2fae97;
      background-position: center bottom;
      background-size: cover;
      height: 100%;
      min-width: 300px;
      border-radius: 10px 0 0 10px;
      position: relative;
      overflow: hidden;

      .dymmer-title {
        color: white;
        margin: 100px 50px 0px 50px;
        text-align: center;
      }

      #dymmer-rocket-img {
        width: 200px;
        display: block;
        position: absolute;
        bottom: -50px;
        left: 60px;
      }
    }
  }

  #dymmer-tile-right {
    background-color: #35465d;
    border-radius: 0 10px 10px 0;
  }

  .field.has-addons {
    justify-content: end;
  }

  .button.is-small {
    font-size: 0.7rem;
  }

  #dymmer-signin-button {
    border-radius: 15px 0 0 15px;
  }

  #dymmer-signup-button {
    border-radius: 0 15px 15px 0;
  }

  .is-blackblue {
    background-color: #5c6878b3;
    border-color: #5c6878b3;
    color: white;
  }

  #dymmer-subtitle {
    margin: 40px 0;
  }

  .dymmer-input {
    background-color: transparent;
    border-color: transparent;
    color: white;
    box-shadow: none;
    border-bottom-color: white;
    border-radius: unset;
  }
  ::-webkit-input-placeholder {
    color: white;
  }

  ::-moz-placeholder {
    color: white;
  }

  :-ms-input-placeholder {
    color: white;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}

@media only screen and (max-width: 768px) {
  #dymmer-modal {
    .tile.is-child {
      margin: 0 auto !important;
    }

    #dymmer-tile-left {
      display: none;
    }

    #dymmer-tile-right {
      background-color: #35465d;
      border-radius: 10px;
    }
  }
}
</style>
