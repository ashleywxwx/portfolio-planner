<template>
  <b-card header="Add Positions and Targets" header-tag="header">
    <b-card-text>Add your current positions</b-card-text>
    <b-form @submit.prevent="addPosition">
      <b-form-row>
        <b-col md>
          <b-form-group
            id="input-group-symbol"
            label="Symbol"
            label-for="input-symbol"
            description="Index or Stock Ticker Symbol"
          >
            <b-form-input id="input-symbol" v-model="newSymbol" type="text" required size="sm"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
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
        <b-col md>
          <b-form-group
            id="input-group-shares"
            label="Current Shares"
            label-for="input-shares"
            description="Currently Held Shares"
          >
            <b-form-input id="input-shares" v-model="newShares" type="number" required size="sm"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
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
        <b-col md align-h="end">
          <b-button variant="primary" size="sm" class="add-position-btn col-xs-12 col-lg-4" type="submit">Add</b-button>
        </b-col>
      </b-form-row>
    </b-form>

    <b-card-text>Current Total Target Allocation</b-card-text>
    <b-progress show-value>
      <b-progress-bar :value="totalTarget" v-bind:variant="progressVariant"></b-progress-bar>
    </b-progress>

    <b-card-text class="mt-3">Available Funds</b-card-text>
    <b-input-group prepend="$" type="number" class="funds-input">
      <b-form-input v-model="availableFunds" type="number"></b-form-input>
    </b-input-group>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Position from "@/models/Position";

@Component({})
export default class AddPositionsCard extends Vue {
  newSymbol = "";
  newPrice = "";
  newShares = "";
  newTarget = "";
  availableFunds = "";

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

  @Watch("availableFunds")
  updateAvailableFunds(): void {
    this.$store.commit("updateAvailableFunds", this.availableFunds);
  }

  get totalTarget(): number {
    return this.$store.getters.currentTotalTarget;
  }
  get progressVariant(): string {
    if (this.$store.getters.currentTotalTarget > 100) {
      return "danger";
    } else if (this.$store.getters.currentTotalTarget < 100) {
      return "warning";
    } else {
      return "success";
    }
  }
}
</script>

<style lang="scss">
@media (min-width: 768px) {
  .add-position-btn {
    margin-top: 32px;
  }
  .funds-input {
    max-width: 12em;
  }
}
@media (max-width: 768px) {
  .add-position-btn {
    margin-bottom: 32px;
  }
}
</style>
