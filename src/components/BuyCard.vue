<template>
  <b-card header="To Buy" header-tag="header">
    <b-card-text>Buys to align current target</b-card-text>
    <b-alert v-model="invalidTarget" variant="warning">Update Targets to reach 100%</b-alert>
    <b-alert v-model="invalidFunds" variant="warning">Add Available Funds</b-alert>
    <b-table
      v-if="!invalidTarget && !invalidFunds"
      striped
      borderless
      small
      hover
      :items="buys"
      :fields="buyFields"
    ></b-table>
  </b-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Buy from "@/models/Buy";
import TableFields from "@/models/TableFields";
import { appendPercent, prependDollar } from "@/utils/GraphFormatters";

@Component({})
export default class BuyCard extends Vue {
  prependDollar = prependDollar;
  appendPercent = appendPercent;

  buyFields: Array<TableFields> = [
    { key: "symbol", label: "Symbol", class: "text-center", sortable: true },
    { key: "shares", label: "Buy Shares", class: "text-center", sortable: true },
    { key: "price", label: "Price", class: "text-center", sortable: true, formatter: "prependDollar" },
    { key: "endShares", label: "End Shares", class: "text-center", sortable: true },
    { key: "cost", label: "Cost", class: "text-center", sortable: true, formatter: "prependDollar" },
    {
      key: "endAllocation",
      label: "End Allocation",
      class: "text-center",
      sortable: true,
      formatter: "appendPercent"
    }
  ];

  get buys(): Array<Buy> {
    return this.$store.getters.buys;
  }
  get invalidTarget(): boolean {
    return this.$store.getters.currentTotalTarget !== 100;
  }
  get invalidFunds(): boolean {
    return !(this.$store.state.availableFunds > 0);
  }
}
</script>
