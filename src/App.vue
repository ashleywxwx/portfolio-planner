<template>
  <div id="app">
    <NavBar />

    <b-container fluid="md">
      <b-row>
        <b-col>
          <b-jumbotron
            header="Portfolio Planner"
            lead="Help calculate potential index fund and stock choices for a balanced portfolio. Provide your current positions, desired portfolio mix, and available funds, and this tool will calculate what you might buy to align your portfolio to your target goals."
          >
            <p>This is not financial planning advice, please don't sue me.</p>
          </b-jumbotron>
        </b-col>
      </b-row>

      <b-row class="mb-4">
        <b-col>
          <AddPositionsCard />
        </b-col>
      </b-row>

      <b-row class="mb-4">
        <b-col>
          <PortfolioCard></PortfolioCard>
        </b-col>
      </b-row>

      <b-row class="mb-4">
        <b-col>
          <BuyCard />
        </b-col>
      </b-row>

      <b-row class="mb-4">
        <b-col>
          <AllocationsGraphCard />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/MyNavBar.vue";
import AddPositionsCard from "@/components/AddPositionsCard.vue";
import PortfolioCard from "@/components/PortfolioCard.vue";
import BuyCard from "@/components/BuyCard.vue";
import AllocationsGraphCard from "@/components/AllocationsGraphCard.vue";

@Component({
  components: {
    AllocationsGraphCard,
    BuyCard,
    PortfolioCard,
    AddPositionsCard,
    NavBar
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.jumbotron {
  margin-top: 32px;
}
</style>
