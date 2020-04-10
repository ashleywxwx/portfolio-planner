<template>
  <b-card header="To Buy" header-tag="header">
    <b-card-text>Buys to align current target</b-card-text>
    <b-alert v-model="invalidTarget" variant="warning">Update Targets to reach 100%</b-alert>
    <b-alert v-model="invalidFunds" variant="warning">Add Available Funds</b-alert>
    <b-table v-if="!invalidTarget || !invalidFunds" striped borderless small hover :items="buys"></b-table>
  </b-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Buy from "@/models/Buy";

@Component({})
export default class BuyCard extends Vue {
  get buys(): Array<Buy> {
    return this.$store.getters.buys;
  }
  get totalTarget(): number {
    return this.$store.getters.currentTotalTarget;
  }
  get invalidTarget(): boolean {
    return this.$store.getters.currentTotalTarget !== 100;
  }
  get invalidFunds(): boolean {
    return !(this.$store.state.availableFunds > 0);
  }
}
</script>
