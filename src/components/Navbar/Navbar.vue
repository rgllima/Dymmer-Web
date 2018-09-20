<template lang="html">
  <nav class="navbar is-transparent card">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <h1 class="is-size-3">DyMMer</h1>
      </a>
      <div class="navbar-burger burger" data-target="navMenu" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navMenu" class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <a class="navbar-item" href="#">
          Home
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="#">
            Docs
          </a>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" href="#">
              Overview
            </a>
            <a class="navbar-item" href="#">
              Modifiers
            </a>
            <a class="navbar-item" href="#">
              Columns
            </a>
            <a class="navbar-item" href="#">
              Layout
            </a>
            <a class="navbar-item" href="#">
              Form
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" href="#">
              Elements
            </a>
            <a class="navbar-item is-active" href="#">
              Components
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <!-- <p class="control">
              <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
                <span class="icon">
                  <i class="fab fa-twitter"></i>
                </span>
                <span>
                  Tweet
                </span>
              </a>
            </p> -->
            <p class="control">
              <a class="button is-dark" href="#">
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
    }
  }
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
}
</script>

<style lang="css">
</style>
