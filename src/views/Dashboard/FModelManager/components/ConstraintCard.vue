<template>
  <div class="constraint-card">
    <b-collapse class="card">
      <div slot="trigger" slot-scope="props" class="card-header" style="width: 100%">
        <p class="card-header-title" style="justify-content: center;">Cross-Tree Constraints</p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'fas fa-angle-down' : 'fas fa-angle-up'"></b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <div v-if="constraints.length !== 0">
            <p v-for="(value, key) in constraints" :key="key">
              <strong>{{key+1}}:</strong>
              {{ value }}
            </p>
          </div>
          <div v-else>
            <p>No constraints</p>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: ["constraints"]
};
</script>

