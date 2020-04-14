<template>
  <b-card header="Portfolio" header-tag="header">
    <b-table responsive striped borderless small hover :items="portfolio" :fields="portfolioFields">
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="danger" @click="deletePosition(row.item.symbol)" class="mr-1">
          Delete
        </b-button>
      </template>
    </b-table>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { prependDollar, appendPercent } from "@/utils/GraphFormatters";
import TableFields from "@/models/TableFields";

@Component({})
export default class extends Vue {
  prependDollar = prependDollar;
  appendPercent = appendPercent;

  portfolioFields: Array<TableFields> = [
    { key: "symbol", label: "Symbol", class: "text-center", sortable: true },
    { key: "shares", label: "Shares", class: "text-center", sortable: true },
    { key: "price", label: "Price", class: "text-center", sortable: true, formatter: "prependDollar" },
    { key: "currentValue", label: "Value", class: "text-center", sortable: true, formatter: "prependDollar" },
    { key: "target", label: "Target Allocation", class: "text-center", sortable: true, formatter: "appendPercent" },
    {
      key: "currentAllocation",
      label: "Current Allocation",
      class: "text-center",
      sortable: true,
      formatter: "appendPercent"
    },
    { key: "actions", class: "text-center", label: "Actions" }
  ];

  get portfolio() {
    return this.$store.getters.portfolio;
  }

  deletePosition(symbol: string): void {
    this.$store.commit("removePosition", symbol);
  }
}
</script>
