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
            <div class="notification">
              <img src="../../../assets/dymmer-screen1.1.png" alt="dymmer-screen1.1" />
            </div>
            <div class="notification">
              <img src="../../../assets/dymmer-screen2.png" alt="dymmer-screen2" />
            </div>

            <div class="notification">
              <img src="../../../assets/dymmer-screen3.png" alt="dymmer-screen3" />
            </div>
            <div class="notification">
              <img src="../../../assets/dymmer-screen4.png" alt="dymmer-screen4" />
            </div>
            <div class="notification">
              <img src="../../../assets/dymmer-screen5.png" alt="dymmer-screen5" />
            </div>
            <div class="notification">
              <img src="../../../assets/dymmer-screen6.png" alt="dymmer-screen6" />
            </div>
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
            <p class="card-header-title has-text-centered">How to edit a feature model?</p>
            <a class="card-header-icon">
              <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <p>Text Here.</p>
          </div>
        </b-collapse>
      </div>

      <div class="content">
        <b-collapse :open="false" class="card is-size-5">
          <div slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
            <p class="card-header-title has-text-centered">How to save a imported feature model?</p>
            <a class="card-header-icon">
              <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
            </a>
          </div>
          <div class="card-content">
            <p>Text Here.</p>
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
            <p>Text Here.</p>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>