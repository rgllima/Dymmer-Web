<template>
  <div class="feature-info-card">
    <b-collapse class="card" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
        <p class="card-header-title" style="justify-content: center;">Feature Information</p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <p>
            <strong>Name your feature model:</strong>
            {{featureModel.name}}
          </p>
          <p>
            <strong>Short description of feature model:</strong>
            {{featureModel.description}}
          </p>
          <p>
            <strong>Primary Author:</strong>
            {{featureModel.creator}}
          </p>
          <p>
            <strong>Author's Address:</strong>
            {{featureModel.address}}
          </p>
          <p>
            <strong>Author's Email:</strong>
            {{featureModel.email}}
          </p>
          <p>
            <strong>Author's Phone Number:</strong>
            {{featureModel.phone}}
          </p>
          <p>
            <strong>Author's Website:</strong>
            {{featureModel.website}}
          </p>
          <p>
            <strong>Author's Organization:</strong>
            {{featureModel.organization}}
          </p>
          <p>
            <strong>Author's Organization Department:</strong>
            {{featureModel.department}}
          </p>
          <p>
            <strong>Date model was created:</strong>
            {{featureModel.date}}
          </p>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: ["featureModel"]
};
</script>

