<template>
  <div class="card box">
    <div class="card-image">
      <figure class="image is-126x126">
        <img class="is-rounded" :src="image" :alt="name" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="../../assets/lattes.png" alt="lattes icon" />
          </figure>
        </div>
        <div class="media-content">
          <p class="is-size-5 is-4 pointer" @click="openPage(lattes)">{{name}}</p>
          <p class="subtitle is-6 pointer" @click="openPage(lattes)">Currículo Lattes</p>
        </div>
      </div>

      <div class="content has-text-justified">{{bio}}</div>

      <div class="content">
        <!-- <p class="pointer" v-if="linkedin" @click="openPage(`https://linkedin.com/in/${linkedin}`)">
          <i class="fab fa-linkedin pointer"></i>
          Linkedin Profile
        </p>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "bio", "lattes", "image"],
  methods: {
    openPage(link) {
      window.open(link, "_blank");
    }
  }
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}

.media-left {
  figure {
    margin: 0;
  }
}

.media-content {
  p {
    margin: 0 !important;
  }
}
</style>