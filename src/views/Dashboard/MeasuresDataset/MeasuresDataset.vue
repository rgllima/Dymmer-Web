<template>
  <div class="measures-dataset">
    <div class="container box">
      <div class="notification">
        <h1 class="subtitle is-size-3 has-text-centered">Measures Dataset</h1>
      </div>
      <div class="tile">
        <div class="tile is-ancestor is-vertical">
          <div class="tile is-parent">
            <img src="../../../assets/macchiato.png" alt="macchiato" />
          </div>
          <div class="tile is-parent">
            <p class="has-text-justified is-size-5">
              The
              <a href="http://carlabezerra.great.ufc.br/macchiato/" target="blank">
                <strong>MAcchiATO</strong>
              </a> (MeAsures dATaset for feaTure mOdels) is a dataset containing the values of 32 quality measures from
              <a
                href="http://carlabezerra.great.ufc.br/macchiato/index.php/coffee"
                target="blank"
              >
                <strong>COfFEE</strong>
              </a> (CatalOg of measures for Feature modEl quality Evaluation) for 218 software feature models, extracted from
              <a
                href="http://splot-research.org"
                target="blank"
              >
                <strong>S.P.L.O.T</strong>
              </a> repository. COfFEE is a catalog containing 32 quality measures that can be used to support the quality evaluation of SPL feature models. The S.P.L.O.T. repository has over six hundred (600) models entered by the SPL community to download. The MAcchiATO is composed of two parts: (i) a set of 218 feature models fetched from S.P.L.O.T repository; and (ii) a compiled spreadsheet containing the values of 32 quality measures, which composes the COfFEE, for each one of 218 features models. MAcchiATO can be used to explored many data analysis techniques for different purposes.
            </p>
          </div>

          <div class="tile is-parent">
            <h1 class="title">ESPREssO</h1>
          </div>
          <div class="tile is-parent">
            <p class="has-text-justified is-size-5">
              <a
                href="https://www.dropbox.com/sh/n8woihop0k71dx5/AACbV0vXX5EmoDK4ksOrnehca?dl=0"
                target="blank"
              >
                <strong>ESPREssO</strong>
              </a> (mEasures dataSet for dsPl featuRE mOdel) is a dataset built to support quality evaluation of DSPL feature models. The ESPREssO dataset consists of: (i) a set of 30 DSPL feature models from the literature; and (ii) a compiled spreadsheet containing the values of 13 quality measures for each of the 30 selected models. The 13 measures that make up the dataset and the 4 specific ones for DSPL. The 9 SPL-related measures cover 5 sub-characteristics of maintainability, but specifically: Analybility (NLeaf), Cognitive Complexity (CogC), Flexibility (FoC), Structural Complexity (DT, NF, RDen) and Variability (RoV, NVC, NO). The 4 specific measures for DSPL are: Context Features (CF), Constraint Context Features (CFC), Context Activated Features (AFCA), and Context Disabled Features (DFCA).
            </p>
          </div>

          <div class="tile is-parent">
            <h1 class="title">S.P.L.O.T.</h1>
          </div>
          <div class="tile is-parent">
            <p class="has-text-justified is-size-5">
              <a href="http://www.splot-research.org/" target="blank">
                <strong>S.P.L.O.T.</strong>
              </a> is an Open Platform that fosters Collaborative Research on Software Product Lines. The platform currently offers researchers a repository of feature models, several tools to edit, analyze, and configure feature models, and free source code that can be customized and/or extended by individuals or groups interested in leveraging SPLOT's infrastructure to build new cutting-edge tools to support the Software Product Line paradigm.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.measures-dataset
  .box
    .tile
      margin-bottom: 40px
      img
        display: block
        width: 100%
        height: auto
</style>