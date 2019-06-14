<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");
body {
  line-height: 1.5 !important;
}
body, button, input, select, textarea {
  font-family: 'Raleway', sans-serif !important;
}
</style>