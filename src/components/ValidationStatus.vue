<template>
  <div>
    <b-alert v-model="this.$store.getters.invalidTarget" variant="warning">Update Targets to reach 100%</b-alert>
    <b-alert v-model="this.$store.getters.invalidFunds" variant="warning">Add Available Funds</b-alert>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ValidationStatus extends Vue {}
</script>
