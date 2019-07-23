<template>
  <div id="home-page">
    <section id="dymmer-header">
      <div class="container">
        <header>
          <navbar/>
        </header>
        <div id="content" class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child">
              <h2 id="mytitle" class="title has-text-white">
                The
                <b-tooltip label="Dynamic feature Model tool based on Measures" dashed>DyMMer</b-tooltip> tool allows the extraction of quality measures from feature models.
              </h2>
              <p
                id="mysubtitle"
                class="subtitle has-text-light"
              >The tool collects a large number of quality measures to support the maintainability evaluation of the features model, 40 measurements in total, uses specific measures for LPSD feature models.</p>
              <div class="buttons">
                <a class="button is-success" @click="openDashboard">GET STARTED</a>
              </div>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child">
              <div id="animation">
                <lottie id="my-lottie" :options="engeneerAnimation"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="dymmer-dashboard">
      <div class="container has-text-centered">
        <div id="mytext">
          <p>The tool helps you create and manipulate</p>
          <p>
            <strong>feature models in a modern dashboard</strong>
          </p>
        </div>
        <div id="dashboard-image">
          <img src="../../assets/dashboard.png" alt="dashboard">
        </div>
      </div>
    </section>

    <section id="dymmer-docs">
      <div class="container">
        <div class="tile is-ancestor" style="margin-top: 50px;">
          <div class="tile is-parent">
            <div class="tile is-child">
              <div class="tile is-child">
                <!-- <div id="animation">
                  <lottie id="my-lottie" :options="engeneerAnimation"/>
                </div>-->
              </div>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child">
              <h2
                id="mytitle"
                class="title has-text-white"
              >Export the values of the quality measures and analyze several feature models together.</h2>
              <p
                id="mysubtitle"
                class="subtitle has-text-light"
              >This is a great advantage of the DyMMer tool, since it makes it possible to analyze several feature models together. DyMMer also allows the domain engineer to export only a subset of the 40 quality measures supported..</p>
              <a class="button is-light is-outlined">
                <span>Learn more</span>
                <span class="icon is-small">
                  <i class="fas fa-arrow-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="dymmer-contactus">
      <div class="container">
        <div id="content" class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child">
              <h2 id="mytitle" class="title has-text-centered">Contact-us.</h2>
              <form class="dymmer-form" action>
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Text input">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="Email input">
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Message</label>
                  <div class="control">
                    <textarea class="textarea" placeholder="Textarea"></textarea>
                  </div>
                </div>

                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child">
              <!-- <div id="animation">
                <lottie id="my-lottie" :options="engeneerAnimation"/>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <futer/>
    </section>
    <!-- <section id="dymmer-footer">
      <footer class="footer" style="background-color: transparent">
        <div class="content has-text-centered">
          <p class="has-text-light">
            <strong class="has-text-light">DyMMer</strong> by
            <a href="https://www.quixada.ufc.br/">Universidade Federal do Ceará - Campus Quixadá</a>. The source code is licensed
            <a
              href="http://opensource.org/licenses/mit-license.php"
            >MIT</a>.
          </p>
        </div>
      </footer>
    </section>-->
  </div>
</template>

<script>
import Lottie from "vue-lottie";
import * as engeneer from "@/assets/engeneer_animation.json";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default {
  components: {
    lottie: Lottie,
    Navbar,
    futer: Footer
  },
  data() {
    return {
      engeneerAnimation: { animationData: engeneer.default }
    };
  },
  methods: {
    openDashboard() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss" scoped>
#home-page {
  #dymmer-header {
    background-image: url("../../assets/background-1.svg");
    background-position: center bottom;
    background-size: cover;
    min-height: 650px;

    #content {
      margin-top: 30px;
    }

    #mytitle {
      margin-top: 70px;
    }

    #mysubtitle {
      margin: 30px 0;
    }

    #animation {
      max-width: 450px;
      max-height: 450px;
      margin: 0 auto;
      margin-bottom: 30px;
    }
  }
  #dymmer-dashboard {
    z-index: -1;
    position: relative;

    #mytext {
      margin-top: 30px;

      p {
        font-size: 1.5rem;
        margin: 0;
      }
    }

    #dashboard-image {
      margin-top: 40px;

      img {
        max-height: 500px;
      }
    }
  }

  #dymmer-docs {
    margin-top: -100px;
    z-index: 10;
    position: relative;
    padding-top: 20px;
    background-image: url("../../assets/background-2.svg");
    background-position: center top;
    background-size: cover;
    min-height: 650px;

    #animation {
      max-width: 450px;
      max-height: 450px;
      margin: 30px auto;
    }

    #mytitle {
      margin-top: 80px;
    }

    #mysubtitle {
      margin: 25px 0;
    }
  }

  #dymmer-contactus {
    margin-top: -135px;
    z-index: 1;
    position: relative;
    padding-top: 140px;
    background-image: url("../../assets/background-3.svg");
    background-position: center top;
    background-size: cover;
    min-height: 700px;
  }

  // #dymmer-footer {
  //   margin-top: -135px;
  //   z-index: 1;
  //   position: relative;
  //   padding-top: 150px;
  //   background-image: url("../../assets/background-4.svg");
  //   background-position: center top;
  //   background-size: cover;
  // }
}
@media only screen and (max-width: 1087px) {
  .container {
    max-width: 960px;
    width: 960px;
  }
}

@media only screen and (max-width: 900px) {
  .container {
    max-width: none;
    width: unset;
    padding: 0 40px;
  }
}

@media only screen and (max-width: 768px) {
  .container {
    padding: 0 20px;
    text-align: center;
  }

  .dymmer-form {
    max-width: 400px;
    margin: 50px auto 100px auto;
    background-color: white;
    padding: 10px;
    border-radius: 10px;

    label {
      text-align: left;
    }
  }
}
</style>
