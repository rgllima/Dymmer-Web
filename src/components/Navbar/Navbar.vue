<template lang="html">
  <nav class="navbar is-transparent" style="background-color: transparent">
    <div class="navbar-brand">
      <a class="navbar-item" @click="pushRouter('/')">
        <h1 class="is-size-3 has-text-white">DyMMer</h1>
      </a>
      <div class="navbar-burger burger" data-target="navMenu" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navMenu" class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <a class="navbar-item has-text-white" @click="pushRouter('/project')">
          The Project
        </a>
        <a class="navbar-item has-text-white" @click="pushRouter('/docs')">
          Documentation
        </a>
        <a class="navbar-item has-text-white" @click="pushRouter('/developers')">
          Developers
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-light is-outlined" @click="pushRouter('/home')">
                <span class="icon">
                  <i class="fas fa-tachometer-alt"></i>
                </span>
                <span>
                  Dashboard
                </span>
              </a>
            </p>
            <p class="control">
              <a class="button is-light is-outlined" target="_blank" href="https://github.com/dymmerufc">
                <span class="icon">
                  <i class="fab fa-github"></i>
                </span>
                <span>Colaborate</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showNav: false
    };
  },
  methods: {
    pushRouter(route) {
      this.$router.push(route)
    }
  },
  // created() {
  //   document.addEventListener('DOMContentLoaded', () => {
  //
  //     // Get all "navbar-burger" elements
  //     const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  //
  //     // Check if there are any navbar burgers
  //     if ($navbarBurgers.length > 0) {
  //
  //       // Add a click event on each of them
  //       $navbarBurgers.forEach( el => {
  //         el.addEventListener('click', () => {
  //
  //           // Get the target from the "data-target" attribute
  //           const target = el.dataset.target;
  //           const $target = document.getElementById(target);
  //
  //           // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
  //           el.classList.toggle('is-active');
  //           $target.classList.toggle('is-active');
  //
  //         });
  //       });
  //     }
  //
  //   });
  // }
};
</script>

<style lang="css">
</style>
