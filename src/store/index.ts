import Vue from "vue";
import Vuex from "vuex";
import Position from "@/models/Position";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    positions: Array<Position>(
      new Position("IDX", 5, 10, 5),
      new Position("TREX", 10, 5, 25),
      new Position("NIPS", 1, 100, 50),
      new Position("STLK", 2, 20, 20)
    )
  },
  mutations: {
    addPosition(state, position) {
      state.positions = [...state.positions, position];
    },
    removePosition(state, symbol) {
      state.positions = state.positions.filter(p => p.symbol !== symbol);
    }
  },
  actions: {},
  modules: {}
});
