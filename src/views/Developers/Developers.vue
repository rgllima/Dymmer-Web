<template>
  <section>
    <div style="background-color: #636be7">
      <div class="container">
        <navbar />
      </div>
    </div>
    <div class="container" style="margin-top: 50px; margin-bottom: 150px;">
      <h1 class="title">Researchers</h1>

      <div class="tile is-ancestor">
        <div class="tile is-parent is-4">
          <div class="content">
            <researchers-card
              :name="researchers[0].name"
              :lattes="researchers[0].lattes"
              :bio="researchers[0].bio"
              :image="researchers[0].image"
            />
          </div>
        </div>

        <div class="tile is-parent is-4">
          <div class="content">
            <researchers-card
              :name="researchers[1].name"
              :lattes="researchers[1].lattes"
              :bio="researchers[1].bio"
              :image="researchers[1].image"
            />
          </div>
        </div>

        <div class="tile is-parent is-4">
          <div class="content">
            <researchers-card
              :name="researchers[2].name"
              :lattes="researchers[2].lattes"
              :bio="researchers[2].bio"
              :image="researchers[2].image"
            />
          </div>
        </div>
      </div>

      <h1 class="title">Developers</h1>

      <div class="tile is-ancestor">
        <div class="tile is-parent is-4">
          <div class="content">
            <developers-card
              :name="developers[0].name"
              :github="developers[0].github"
              :linkedin="developers[0].linkedin"
              :bio="developers[0].bio"
              :image="developers[0].image"
            />
          </div>
        </div>

        <div class="tile is-parent is-4">
          <div class="content">
            <developers-card
              :name="developers[1].name"
              :github="developers[1].github"
              :linkedin="developers[1].linkedin"
              :bio="developers[1].bio"
              :image="developers[1].image"
            />
          </div>
        </div>
      </div>

      <div class="tile is-ancestor">
        <!-- <div class="tile is-parent is-4">
          <div class="content">
            <developers-card
              :name="developers[2].name"
              :github="developers[2].github"
              :linkedin="developers[2].linkedin"
              :bio="developers[2].bio"
              :image="developers[2].image"
            />
          </div>
        </div> -->

        <div class="tile is-parent is-4">
          <div class="content">
            <developers-card
              :name="developers[3].name"
              :github="developers[3].github"
              :linkedin="developers[3].linkedin"
              :bio="developers[3].bio"
              :image="developers[3].image"
            />
          </div>
        </div>

        <!-- <div class="tile is-parent is-4">
          <div class="content">
            <developers-card
              :name="developers[4].name"
              :github="developers[4].github"
              :linkedin="developers[4].linkedin"
              :bio="developers[4].bio"
              :image="developers[4].image"
            />
          </div>
        </div> -->
      </div>

      <!-- <div class="tile is-ancestor">
        <div class="tile is-parent is-4">
          <div class="content">
            <developers-card
              :name="developers[5].name"
              :github="developers[5].github"
              :linkedin="developers[5].linkedin"
              :bio="developers[5].bio"
              :image="developers[5].image"
            />
          </div>
        </div>
      </div> -->

    </div>
    <div>
      <futer />
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from "@/components/Footer/Footer";
import DevelopersCard from "./DevelopersCard";
import ResearchersCard from "./ResearchersCard";

const rgllima = require("../../assets/rgllima.jpeg");
const publiosilva = require("../../assets/publiosilva.jpeg");
const anderson = require("../../assets/anderson.jpg");

const rossana = require("../../assets/rossana.jpg");
const josemaria = require("../../assets/jose-maria.jpg");
const carlailane = require("../../assets/carla.jpeg");

export default {
  components: {
    Navbar,
    futer: Footer,
    DevelopersCard,
    ResearchersCard
  },
  data() {
    return {
      developers: [
        {
          name: "Publio Silva",
          github: "publiosilva",
          linkedin: "publio-blenilio-b97a2b130",
          bio:
            "Software Engineering student at Federal University of Ceará, Quixada, Ceara, Brazil.",
          image: publiosilva
        },
        {
          name: "Rafael Lima",
          github: "rgllima",
          linkedin: "rgllima",
          bio:
            "Software Engineering student at Federal University of Ceará, Quixada, Ceara, Brazil.",
          image: rgllima
        },
        {
          name: "Luan Lima",
          github: "",
          linkedin: "",
          bio:
            "Software Engineering student at Federal University of Ceará, Quixada, Ceara, Brazil.",
          image: "https://bulma.io/images/placeholders/1280x960.png"
        },
        {
          name: "Anderson Uchoa",
          github: "anderson-uchoa",
          linkedin: "andersongnuchoa",
          bio:
            "PhD candidate in Software Engineering, Researcher at LES/PUC-Rio & MSc in Software Engineering.",
          image: anderson
        },
        {
          name: "Jefferson",
          github: "",
          linkedin: "",
          bio:
            "Software Engineering student at Federal University of Ceará, Quixada, Ceara, Brazil.",
          image: "https://bulma.io/images/placeholders/1280x960.png"
        },
        {
          name: "Holanda Júnior",
          github: "",
          linkedin: "",
          bio:
            "Software Engineering student at Federal University of Ceará, Quixada, Ceara, Brazil.",
          image: "https://bulma.io/images/placeholders/1280x960.png"
        }
      ],
      researchers: [
        {
          name: "Dra. Carla Ilane",
          lattes: "http://lattes.cnpq.br/4277471687235814",
          bio: "She is an adjunct professor at the Federal University of Ceará (UFC) at the Quixadá Campus. He holds a doctorate in Computer Science from the Federal University of Ceará - UFC (2016) and a master's degree in Applied Informatics from the University of Fortaleza - UNIFOR (2009). Acted as a Systems Analyst with 6 years of experience in Software Process Improvement and Software Testing.",
          image: carlailane
        },
        {
          name: "Dra. Rossana Andrade",
          lattes: "http://lattes.cnpq.br/9576713124661835",
          bio:
            "Rossana holds a PhD in Computer Science from the University of Ottawa (2001), a master's degree in Computer Science from the Federal University of Paraíba (1992), and a degree in Computer Science from the State University of Ceará (1989). She has been a professor at the Federal University of Ceará, in the Computing Department, since 1994, and is currently Associate Professor IV.",
          image: rossana
        },
        {
          name: "Dr. José Maria Monteiro",
          lattes: "http://lattes.cnpq.br/9790693300026949",
          bio: "Graduated in Bachelor of Computer Science from the Federal University of Ceará (1998), Master in Computer Science from the Federal University of Ceará (2001) and PhD in Computer Science from the Pontifical Catholic University of Rio de Janeiro - PUC-Rio (2008). Has experience in Computer Science, focusing on Database and Software Engineering.",
          image: josemaria
        }
      ]
    };
  }
};
</script>