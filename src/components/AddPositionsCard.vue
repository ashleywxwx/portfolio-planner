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
            invalid-feedback="Unique symbol required"
          >
            <b-form-input
              id="input-symbol"
              :value="this.$store.state.newSymbol"
              @input="updateSymbol"
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
                :value="this.$store.state.newPrice"
                @update="updatePrice"
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
              :value="this.$store.state.newShares"
              @update="updateShares"
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
                :value="this.$store.state.newTarget"
                @update="updateTarget"
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
  validSymbol?: boolean = true;
  validPrice?: boolean = true;
  validShares?: boolean = true;
  validTarget?: boolean = true;

  addPosition(): void {
    this.validSymbol =
      this.$store.state.newSymbol.length > 0 &&
      this.$store.state.positions.filter((p: Position) => p.symbol == this.$store.state.newSymbol).length == 0;
    this.validPrice = parseFloat(this.$store.state.newPrice) > 0;
    this.validShares = parseFloat(this.$store.state.newShares) >= 0;
    this.validTarget = parseFloat(this.$store.state.newTarget) >= 0;

    if (this.validSymbol && this.validPrice && this.validShares && this.validTarget) {
      this.$store.commit(
        "addPosition",
        new Position(
          this.$store.state.newSymbol,
          parseFloat(this.$store.state.newPrice),
          parseInt(this.$store.state.newShares),
          parseFloat(this.$store.state.newTarget)
        )
      );
      this.$store.commit("clearNew");
    }
  }

  updateAvailableFunds(e: number): void {
    this.$store.commit("updateAvailableFunds", e);
  }

  updateSymbol(e: string): void {
    this.$store.commit("updateNewSymbol", e);
  }

  updatePrice(e: number): void {
    this.$store.commit("updateNewPrice", e.toString());
  }

  updateShares(e: number): void {
    this.$store.commit("updateNewShares", e.toString());
  }

  updateTarget(e: number): void {
    this.$store.commit("updateNewTarget", e.toString());
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
