<template>
  <b-card header="Portfolio" header-tag="header">
    <b-table striped hover :items="positions" :fields="portfolioFields">
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
  sortable?: boolean;
}

@Component({})
export default class extends Vue {
  portfolioFields: Array<PortfolioFields> = [
    { key: "symbol", label: "Symbol", sortable: true },
    { key: "price", label: "Current Price", sortable: true },
    { key: "shares", label: "Current Shares", sortable: true },
    { key: "target", label: "Target Allocation", sortable: true },
    { key: "actions", label: "Actions" }
  ];

  get positions() {
    return this.$store.state.positions;
  }

  deletePosition(symbol: string): void {
    this.$store.commit("removePosition", symbol);
  }
}
</script>
