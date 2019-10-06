<template>
  <section>
    <div style="background-color: #636be7">
      <div class="container">
        <navbar />
      </div>
    </div>
    <div class="container has-text-justified" style="margin-top: 50px;">
      <h1 class="title">Abstract</h1>
      <p
        class="is-size-5"
      >The objective of this project was to continue the development of a quality framework that includes all the characteristics, attributes and measures necessary to evaluate the quality of the DSPL and SPL features models, extending the COfFEE catalog with 4 measures. To automate the quality assessment execution process, the DyMMer tool has been extended to include measurements of other quality attributes of the feature model. DyMMer has been re-deployed to address the web format and has received new functionality: feature model creation (being able to add a new feature model regardless of the SPLOT tool), inclusion of DSPL and SPL repositories, addition of context constraints, implementation of thresholds for measurements.</p>
      <br />
      <p
        class="is-size-5"
      >The project also built a real DSPL dataset, which will serve as the basis for experimental studies and the extension of a SPL dataset. As a result of the measure aggregation process, fuzzy logic was used to aggregate a subset of 15 measures that generated the feature model maintainability index. This was the result of a Course Completion Paper and an article published in the Brazilian Symposium. of Software Engineering.</p>
    </div>

    <div class="container has-text-justified" style="margin-top: 50px; margin-bottom: 150px;">
      <h1 class="title">The DyMMer Web</h1>
      <p
        class="is-size-5"
      >To extend the framework it was only necessary to add 4 measures of variability to evaluate the feature model. The systematic review we have identified is current and most measures for feature model evaluation were already covered in the DyMMer tool.</p>
      <br />
      <p
        class="is-size-5"
      >The great result of the project is the extension of the DyMMer tool to web format including new features, such as the creation of feature models of DSPL and SPL, because before the tool only edited existing feature models imported from the SPLOT tool. In addition, the tool allows included SPL and DSPL models to be stored in repositories that can serve the scientific community for future studies. In the new DyMMer, quality measures have been implemented in a more modular way than in the previous version, which will allow for the inclusion (or withdrawal) of new measures in the future more simply and directly.</p>
      <br />
      <p
        class="is-size-5"
      >To evaluate feature models, in addition to measurements, we used data from the repository models to derive thresholds for each measure using the VALE method (Vale et al., 2019), and this allowed each measure to be evaluated individually for each measure. each model. The creators of the aforementioned method themselves provided a desktop tool capable of calculating thresholds using the VALE method and 3 other methods. However, we decided to implement the method directly in DyMMer, as this will allow the calculation of thresholds to be redone automatically whenever new feature models are imported into the tool. The tool uses the thresholds obtained in the last execution of the method as a reference but it is also possible to obtain the results of all executions of the VALE method.</p>
      <br />
      <p
        class="is-size-5"
      >Finally, the MAcchiATO dataset, called MiniCoFFEE, was extended. This dataset was used in a study using fuzzy logic for measure aggregation to evaluate the maintainability of the feature model in SPL, obtaining a new aggregate measure that represents the maintainability index of a feature model (MIFM). It was found that the added value obtained allows measuring whether a feature model has a high or low maintainability index, helping the domain engineer to evaluate the model maintainability more quickly and accurately.</p>
    </div>
    <div>
      <futer />
    </div>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from "@/components/Footer/Footer";

export default {
  components: {
    Navbar,
    futer: Footer
  }
};
</script>