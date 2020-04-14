<template>
  <b-card header="Allocations" header-tag="header">
    <ValidationStatus />
    <div v-if="!this.$store.getters.invalidTarget && !this.$store.getters.invalidFunds">
      <b-row>
        <b-col>
          <b-button :pressed.sync="enablePattern" variant="primary" size="sm" class="float-right">Pattern</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4">
          <AllocationChart :chartData="targets" :title="'Current Allocations'"></AllocationChart>
        </b-col>
        <b-col md="4">
          <AllocationChart :chartData="currents" :title="'Target Allocations'"></AllocationChart>
        </b-col>
        <b-col md="4">
          <AllocationChart :chartData="ends" :title="'Potential Allocations'"></AllocationChart>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as pattern from "patternomaly";
import Position from "@/models/Position";
import PortfolioRecord from "@/models/PortfolioRecord";
import Buy from "@/models/Buy";
import AllocationChart from "@/components/AllocationChart.vue";
import ValidationStatus from "@/components/ValidationStatus.vue";

const colors = [
  "#f39c12",
  "#2ecc71",
  "#2980b9",
  "#8e44ad",
  "#e74c3c",
  "#16a085",
  "#d35400",
  "#f1c40f",
  "#3498db",
  "#9b59b6",
  "#c0392b",
  "#1abc9c"
];
const patterns = pattern.generate(colors);

@Component({
  components: { AllocationChart, ValidationStatus }
})
export default class AllocationsGraphCard extends Vue {
  enablePattern = false;

  get targets(): Record<string, any> {
    return {
      labels: this.$store.state.positions.map((p: Position) => p.symbol),
      datasets: [
        {
          data: this.$store.state.positions.map((p: Position) => p.target),
          backgroundColor: this.enablePattern ? patterns : colors
        }
      ]
    };
  }
  get currents(): Record<string, any> {
    return {
      labels: this.$store.state.positions.map((p: Position) => p.symbol),
      datasets: [
        {
          data: this.$store.getters.portfolio.map((p: PortfolioRecord) => p.currentAllocation),
          backgroundColor: this.enablePattern ? patterns : colors
        }
      ]
    };
  }
  get ends(): Record<string, any> {
    return {
      labels: this.$store.state.positions.map((p: Position) => p.symbol),
      datasets: [
        {
          data: this.$store.getters.buys.map((b: Buy) => b.endAllocation),
          backgroundColor: this.enablePattern ? patterns : colors
        }
      ]
    };
  }
}
</script>
