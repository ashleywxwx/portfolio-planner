<template>
  <div id="app">
    <NavBar />

    <b-container>
      <b-row>
        <b-jumbotron
          header="Portfolio Calculator"
          lead="Help calculate potential index fund and stock choices for a balanced portfolio"
        >
          <p>This is not financial planning advice, please don't sue me.</p>
        </b-jumbotron>
      </b-row>

      <b-row>
        <Positions />
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/MyNavBar.vue";
import Positions from "@/components/Positions.vue";

@Component({
  components: {
    Positions,
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

.container {
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
