<template>
  <b-card header="My Positions" header-tag="header">
    <b-card-text>Add your current positions</b-card-text>

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
        <b-form-group id="input-group-price" label="Price" label-for="input-price" description="Current Trading Price">
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
        <b-button variant="primary" size="sm" class="add-position" type="submit" @click="addPosition">Add</b-button>
      </b-col>
    </b-form-row>

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

class Position {
  symbol: string;
  price: number;
  shares: number;
  target: number;

  constructor(symbol: string, price: number, shares: number, target: number) {
    this.symbol = symbol;
    this.price = price;
    this.shares = shares;
    this.target = target;
  }
}

@Component
export default class MyPositions extends Vue {
  positions: Array<Position> = [];
  newSymbol = "";
  newPrice = 0;
  newShares = 0;
  newTarget = 0;
  positionsFields: Array<Record<string, any>> = [
    { key: "symbol", label: "Symbol", sortable: true },
    { key: "price", label: "Current Price", sortable: true },
    { key: "shares", label: "Current Shares", sortable: true },
    { key: "target", label: "Target Allocation", sortable: true },
    { key: "actions", label: "Actions" }
  ];

  // TODO: Validations
  addPosition(): void {
    this.positions.push(new Position(this.newSymbol, this.newPrice, this.newShares, this.newTarget));
    this.newSymbol = "";
    this.newPrice = 0;
    this.newShares = 0;
    this.newTarget = 0;
  }

  deletePosition(symbol: string): void {
    console.log("Deleting position: " + symbol);
    this.positions = this.positions.filter(p => p.symbol !== symbol);
  }
}
</script>

<style lang="scss">
.add-position {
  margin-top: 32px;
}
</style>
