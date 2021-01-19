<template>
  <div class="login">
    <LoginCard />
  </div>
</template>

<script>
import LoginCard from "./LoginCard";

export default {
  components: {
    LoginCard
  }
};
</script>

<style lang="sass" scoped>
.login
  min-height: 500px
  height: 100vh
  display: flex
  background: #5c6a7a
  justify-content: center
  align-items: center
</style>
