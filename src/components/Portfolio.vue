<template>
  <b-card header="Portfolio" header-tag="header">
    <b-table striped borderless small hover :items="portfolio" :fields="portfolioFields">
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="deletePosition(row.item.symbol)" class="mr-1">
          Delete
        </b-button>
      </template>
    </b-table>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface PortfolioFields {
  key: string;
  label: string;
  class: string;
  sortable?: boolean;
  formatter?: string;
}

@Component({})
export default class extends Vue {
  portfolioFields: Array<PortfolioFields> = [
    { key: "symbol", label: "Symbol", class: "text-center", sortable: true },
    { key: "price", label: "Price", class: "text-center", sortable: true, formatter: "prependDollar" },
    { key: "shares", label: "Shares", class: "text-center", sortable: true },
    { key: "currentValue", label: "Value", class: "text-center", sortable: true, formatter: "prependDollar" },
    { key: "target", label: "Target", class: "text-center", sortable: true, formatter: "appendPercent" },
    {
      key: "currentAllocation",
      label: "Allocation",
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

  prependDollar(value: number): string {
    return "$" + value.toFixed(2);
  }

  appendPercent(value: number): string {
    return value + "%";
  }
}
</script>
