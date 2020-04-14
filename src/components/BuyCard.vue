<template>
  <b-card header="To Buy" header-tag="header">
    <b-card-text>Buys to align current target</b-card-text>
    <ValidationStatus />
    <b-table
      v-if="!this.$store.getters.invalidTarget && !this.$store.getters.invalidFunds"
      striped
      borderless
      responsive
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
import ValidationStatus from "@/components/ValidationStatus.vue";

@Component({
  components: { ValidationStatus }
})
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
}
</script>
