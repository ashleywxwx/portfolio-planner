<template>
  <b-card header="My Positions" header-tag="header">
    <b-card-text>Add your current positions</b-card-text>
    <b-form @submit.prevent="addPosition">
      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-symbol"
            label="Symbol"
            label-for="input-symbol"
            description="Index or Stock Ticker Symbol"
          >
            <b-form-input id="input-symbol" v-model="newSymbol" type="text" required size="sm"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-price"
            label="Price"
            label-for="input-price"
            description="Current Trading Price"
          >
            <b-input-group size="sm" prepend="$">
              <b-form-input id="input-price" v-model="newPrice" type="number" required size="sm"></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-shares"
            label="Current Shares"
            label-for="input-shares"
            description="Currently Held Shares"
          >
            <b-form-input id="input-symbol" v-model="newShares" type="number" required size="sm"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-target"
            label="Target Allocation"
            label-for="input-target"
            description="Desired Portfolio Mix"
          >
            <b-input-group size="sm" append="%">
              <b-form-input id="input-target" v-model="newTarget" type="number" required size="sm"></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="auto">
          <b-button variant="primary" size="sm" class="add-position" type="submit">Add</b-button>
        </b-col>
      </b-form-row>
    </b-form>
    <div>
      <b-card-text>Current Positions</b-card-text>
      <b-table striped hover :items="positions" :fields="positionsFields">
        <template v-slot:cell(actions)="row">
          <b-button size="sm" @click="deletePosition(row.item.symbol)" class="mr-1">
            Delete
          </b-button>
        </template>
      </b-table>
    </div>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Position from "@/models/Position";

interface PositionFields {
  key: string;
  label: string;
  sortable?: boolean;
}

@Component
export default class AddPositionsCard extends Vue {
  // positions: Array<Position>;
  newSymbol = "";
  newPrice = "";
  newShares = "";
  newTarget = "";
  positionsFields: Array<PositionFields> = [
    { key: "symbol", label: "Symbol", sortable: true },
    { key: "price", label: "Current Price", sortable: true },
    { key: "shares", label: "Current Shares", sortable: true },
    { key: "target", label: "Target Allocation", sortable: true },
    { key: "actions", label: "Actions" }
  ];

  get positions() {
    return this.$store.state.positions;
  }

  // TODO: Validations
  addPosition(): void {
    this.$store.commit(
      "addPosition",
      new Position(this.newSymbol, parseInt(this.newPrice), parseInt(this.newShares), parseInt(this.newTarget))
    );
    this.newSymbol = "";
    this.newPrice = "";
    this.newShares = "";
    this.newTarget = "";
  }

  deletePosition(symbol: string): void {
    this.$store.commit("removePosition", symbol);
  }
}
</script>

<style lang="scss">
.add-position {
  margin-top: 32px;
}
</style>
