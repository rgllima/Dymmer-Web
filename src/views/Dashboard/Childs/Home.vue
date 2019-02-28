<template>
  <div id="home-page">
    <div style="max-width: 800px; margin: 0 auto;">
      <div class="tile is-ancestor">
        <div class="tile is-child">
          <div class="tile">
            <div class="tile is-parent">
              <a href="#" class="box image is-256x256">
                <img src="../../../assets/edit-tools.svg" alt="settings">
                <br>
                <p class="has-text-centered">Create Feature Model</p>
              </a>
            </div>
            <div class="tile is-parent">
              <a href="#" class="box image is-256x256">
                <img src="../../../assets/import.svg" alt="settings">
                <br>
                <p class="has-text-centered">Import Feature Model XML</p>
                <input
                  class="file-input"
                  type="file"
                  name="xmlString"
                  id="getXmlToString"
                  ref="MyXMLFile"
                  @change="getXmlToString"
                >
              </a>
            </div>
            <div class="tile is-parent">
              <a href="#" class="box image is-256x256">
                <img src="../../../assets/protractor.svg" alt="settings">
                <br>
                <p class="has-text-centered">Apply Quality Measures</p>
              </a>
            </div>
            <div class="tile is-parent">
              <a href="#" class="box image is-256x256">
                <img src="../../../assets/wireframe.svg" alt="settings">
                <br>
                <p class="has-text-centered">Feature Model Configuration</p>
              </a>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent">
              <a href="#" class="box image is-256x256">
                <img src="../../../assets/analysis.svg" alt="settings">
                <br>
                <p class="has-text-centered">My Feature Models</p>
              </a>
            </div>
            <div class="tile is-parent">
              <a href="#" class="box image is-256x256">
                <img src="../../../assets/database.svg" alt="settings">
                <br>
                <p class="has-text-centered">Feature Model Repository</p>
              </a>
            </div>

            <div class="tile is-parent">
              <a href="#" class="box image is-256x256">
                <img src="../../../assets/notebook.svg" alt="settings">
                <br>
                <p class="has-text-centered">Help</p>
              </a>
            </div>
            <div class="tile is-parent">
              <a href="#" class="box image is-256x256">
                <img src="../../../assets/settings.svg" alt="settings">
                <br>
                <p class="has-text-centered">Account Settings</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    pushRouter(route) {
      this.$router.push(route);
    },
    getXmlToString(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        this.$store.dispatch("featureModel/convertXmlToJson", e.target.result);
      };
      reader.readAsText(file);
    }
  }
};
</script>

<style lang="scss" scoped>
#home-page {
  padding: 20px !important;
}
</style>
