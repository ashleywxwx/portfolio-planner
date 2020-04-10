import Vue from "vue";
import Vuex from "vuex";
import Position from "@/models/Position";
import PortfolioRecord from "@/models/PortfolioRecord";

Vue.use(Vuex);

interface VuexState {
  positions: Array<Position>;
}

function getTotalValue(positions: Array<Position>): number {
  return positions.reduce((acc, cur) => {
    return acc + cur.price * cur.shares;
  }, 0);
}

function getCurrentAllocation(p: Position, positions: Array<Position>): string {
  const currentVal = p.price * p.shares;
  const totalValue = getTotalValue(positions);
  return (Math.round((currentVal / totalValue) * 10000) / 100).toFixed(2);
}

export default new Vuex.Store({
  state: {
    positions: Array<Position>(
      new Position("IDX", 5, 10, 5),
      new Position("TREX", 10, 5, 25),
      new Position("NIPS", 1, 100, 50),
      new Position("STLK", 2, 20, 20)
    )
  },
  getters: {
    totalValue: (state: VuexState): number => {
      return getTotalValue(state.positions);
    },
    portfolio: (state: VuexState): Array<PortfolioRecord> => {
      return state.positions.map(
        (p: Position) =>
          new PortfolioRecord(
            p.symbol,
            p.price,
            p.shares,
            p.target,
            p.price * p.shares,
            getCurrentAllocation(p, state.positions)
          )
      );
    },
    currentTotalTarget: (state: VuexState): number => {
      return state.positions.reduce((acc, cur) => acc + cur.target, 0);
    }
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
