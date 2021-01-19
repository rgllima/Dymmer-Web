<template>
  <div class="help-page">
    <div class="container box">
      <div class="notification">
        <h1 class="subtitle is-size-3 has-text-centered">Help</h1>
      </div>

      <div class="content">
        <b-collapse :open="false" class="card is-size-5">
          <div  slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
            <p class="card-header-title has-text-centered">DyMMer General Guide</p>
            <a class="card-header-icon">
              <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="notification">
              <img src="../../../assets/dymmer-screen1.png" alt="dymmer-screen1" />
            </div>
            <p>
              Tool overview. Basically all the features are accessible from this
              page.
            </p>

            <div class="notification">
              <img src="../../../assets/dymmer-screen1.1.png" alt="dymmer-screen1.1" />
            </div>
            <p>
              Constraint editor. The constraints of the feature model can be
              edited from this page. Changes are only made when the user saves.
            </p>

            <div class="notification">
              <img src="../../../assets/dymmer-screen2.png" alt="dymmer-screen2" />
            </div>
            <p>
              Context Manager. In this section, user can create and edit the
              feature model contexts.
            </p>

            <div class="notification">
              <img src="../../../assets/dymmer-screen3.png" alt="dymmer-screen3" />
            </div>
            <p>
              Apply Mesures. In this section, user can apply the supported
              quality measures.
            </p>

            <div class="notification">
              <img src="../../../assets/dymmer-screen4.png" alt="dymmer-screen4" />
            </div>
            <p>
              List of quality measures. The users can choose what quality
              measures will be applied.
            </p>

            <div class="notification">
              <img src="../../../assets/dymmer-screen5.png" alt="dymmer-screen5" />
            </div>
            <p>
              After applying the quality measures, the results of each metric
              are displayed, as well as the relationships between the thresholds
              defined for each metric.
            </p>
          </div>
        </b-collapse>
      </div>

      <div class="content">
        <b-collapse :open="false" class="card is-size-5">
          <div slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
            <p class="card-header-title has-text-centered">How to create a feature model?</p>
            <a class="card-header-icon">
              <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <p>
              To create a feature model, click on the
              <strong>"Add Feature Model"</strong> in the sidebar, a modal will appear then you must click on the
              <strong>"Create Feature Model"</strong> icon. In the next step, you must insert the basic information about the feature model then you must click on the
              <strong>"Create Feature Model"</strong> button. Ready, the page of feature model management will appear with your feature model.
            </p>
          </div>
        </b-collapse>
      </div>

      <div class="content">
        <b-collapse :open="false" class="card is-size-5">
          <div slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
            <p class="card-header-title has-text-centered">How to import a XML feature model?</p>
            <a class="card-header-icon">
              <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <p>
              To import a feature model you must click on
              <strong>"Add Feature Model"</strong> in the left sidebar. Then you should click on
              <strong>"Import XML"</strong>. An Operating System window will appear for you to select a feature template to import. After importing you will be redirected to the invoice template management page.
            </p>
          </div>
        </b-collapse>
      </div>

      <div class="content">
        <b-collapse :open="false" class="card is-size-5">
          <div slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
            <p class="card-header-title has-text-centered">How to edit and save a feature model?</p>
            <a class="card-header-icon">
              <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <figure class="image">
              <img src="../../../assets/fm_modeling.png" alt="dymmer-screen1" />
              <figcaption>Figure 2 - Modeling feature model.</figcaption>
            </figure>
            <p>
              Figure 2 illustrates the modeling of a DSPL feature model. In the
              feature diagram, the entire feature tree of the model is displayed,
              icons represent the types and features relationships, and the
              hierarchy is denoted by the spacing so that the rightmost features are
              descendants of the upper leftmost features. In Figure 2, item 4
              highlights the process of creating, changing and removing features
              through a toolbox that is displayed after the user clicks (with the
              right mouse button) on the feature to be edited.
            </p>
            <p>
              Item 5 in the same figure highlights the module's editing module
              constraints. After the user clicks on the edit constraints button, a
              window will be opened so that constraints can be selected to be
              applied, changed or removed from the model. Finally, item 3 in Figure
              2 highlights the button to save the changes made. When clicking on the
              save button, the model is sent for persistence in the tool repository.
              This process can be performed whenever changes are made to the feature
              model.
            </p>
          </div>
        </b-collapse>
      </div>

      <div class="content">
        <b-collapse :open="false" class="card is-size-5">
          <div slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
            <p class="card-header-title has-text-centered">How to export a measure result?</p>
            <a class="card-header-icon">
              <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <figure class="image">
              <img src="../../../assets/fm_exports.png" alt="dymmer-screen1" />
              <figcaption>Figure 5 - Exporting to XML, CSV and PDF.</figcaption>
            </figure>

            <p>
              Figure 5 highlights the tool's export features. To export the feature
              model to XML, the user must go to the FEATURE MODEL, highlighted by
              item 10, and then click on the button to export the feature model. It
              is only possible to export one model at a time and the user can choose
              between exporting the feature model with or without contexts.
            </p>
            <p>
              The tool also allows the export of results of maintenance measures.
              This function is highlighted by item 11 in Figure 5. The user can
              export the results in PDF or CSV. After clicking on the export
              buttons, the document will be downloaded automatically containing the
              information of the feature model the results of applied measures.
            </p>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>
