<template>
  <b-card header="Add Positions and Targets" header-tag="header">
    <b-card-text>Add your current positions</b-card-text>
    <b-form @submit.prevent="addPosition" novalidate>
      <b-form-row>
        <b-col md>
          <b-form-group
            id="input-group-symbol"
            label="Symbol"
            label-for="input-symbol"
            description="Index or Stock Ticker Symbol"
            invalid-feedback="Valid symbol required"
          >
            <b-form-input
              id="input-symbol"
              v-model="newSymbol"
              type="text"
              required
              size="sm"
              :state="validSymbol ? null : false"
            ></b-form-input>
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
              <b-form-input
                id="input-price"
                v-model="newPrice"
                type="number"
                required
                size="sm"
                :state="validPrice ? null : false"
              ></b-form-input>
            </b-input-group>
            <b-form-invalid-feedback :state="validPrice ? null : false">Must be $0 or higher</b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col md>
          <b-form-group
            id="input-group-shares"
            label="Current Shares"
            label-for="input-shares"
            description="Currently Held Shares"
            invalid-feedback="Must be greater than 0"
          >
            <b-form-input
              id="input-shares"
              v-model="newShares"
              type="number"
              required
              size="sm"
              :state="validShares ? null : false"
            ></b-form-input>
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
              <b-form-input
                id="input-target"
                v-model="newTarget"
                type="number"
                required
                size="sm"
                :state="validTarget ? null : false"
              ></b-form-input>
            </b-input-group>
            <b-form-invalid-feedback :state="validTarget ? null : false">Must be 0% or higher</b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col md align-h="end">
          <b-button variant="primary" size="sm" class="add-position-btn col-xs-12 col-lg-4" type="submit">Add</b-button>
        </b-col>
      </b-form-row>
    </b-form>

    <b-card-text>Current Target Allocation</b-card-text>
    <b-progress height="2rem" :style="{ fontSize: 1.25 + 'em' }">
      <b-progress-bar :value="totalTarget" v-bind:variant="progressVariant"
        ><strong>{{ totalTarget }}%</strong></b-progress-bar
      >
    </b-progress>

    <b-card-text class="mt-3">Available Funds</b-card-text>
    <b-input-group prepend="$" type="number" class="funds-input">
      <b-form-input :value="availableFunds" @input="updateAvailableFunds" type="number"></b-form-input>
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
  validSymbol?: boolean = true;
  validPrice?: boolean = true;
  validShares?: boolean = true;
  validTarget?: boolean = true;

  addPosition(): void {
    this.validSymbol = this.newSymbol.length > 0;
    this.validPrice = parseFloat(this.newPrice) > 0;
    this.validShares = parseFloat(this.newShares) >= 0;
    this.validTarget = parseFloat(this.newTarget) >= 0;

    if (this.validSymbol && this.validPrice && this.validShares && this.validTarget) {
      this.$store.commit(
        "addPosition",
        new Position(this.newSymbol, parseFloat(this.newPrice), parseInt(this.newShares), parseFloat(this.newTarget))
      );
      this.newSymbol = "";
      this.newPrice = "";
      this.newShares = "";
      this.newTarget = "";
    }
  }

  updateAvailableFunds(e: any): void {
    this.$store.commit("updateAvailableFunds", e);
  }

  get availableFunds(): number {
    return this.$store.state.availableFunds;
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
