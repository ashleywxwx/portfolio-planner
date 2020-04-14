import Vue from "vue";
import Vuex from "vuex";
import Position from "@/models/Position";
import PortfolioRecord from "@/models/PortfolioRecord";
import Buy from "@/models/Buy";

Vue.use(Vuex);

interface VuexState {
  positions: Array<Position>;
  availableFunds?: number;
}

function round(value: number): number {
  return Number(Math.round(value + Number.EPSILON) + "e-" + 2);
}

function getTotalValue(positions: Array<Position>): number {
  return positions.reduce((acc, cur) => {
    return acc + cur.price * cur.shares;
  }, 0);
}

function getCurrentAllocation(p: Position, positions: Array<Position>): number {
  const currentVal = p.price * p.shares;
  const totalValue = getTotalValue(positions);
  return round((currentVal / totalValue) * 10000);
}

const getTotalTarget = (positions: Array<Position>): number => positions.reduce((acc, cur) => acc + cur.target, 0);

const shouldBuyFilter = (totalFunds: number, position: Position): boolean =>
  Math.floor((totalFunds * (position.target / 100)) / position.price) > position.shares;

export default new Vuex.Store({
  state: {
    positions: Array<Position>(
      new Position("TUR", 10, 10, 5),
      new Position("NIPS", 10, 50, 25),
      new Position("STLK", 10, 100, 50),
      new Position("MKT", 20, 0, 20)
    ),
    availableFunds: 1000
  },
  getters: {
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
      return getTotalTarget(state.positions);
    },
    buys: (state: VuexState): Array<Buy> => {
      if (state.availableFunds && state.availableFunds > 0 && getTotalTarget(state.positions) === 100) {
        const totalFunds = +state.availableFunds + +getTotalValue(state.positions);
        const shouldBuy = state.positions.filter(position => shouldBuyFilter(totalFunds, position));

        const buys = shouldBuy
          .map(position => {
            const overTarget = position.target / getTotalTarget(shouldBuy);
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore state.availableFunds validate above
            const shares = Math.floor((state.availableFunds * overTarget) / position.price);
            return new Buy(position.symbol, shares, shares + position.shares, position.price, position.price * shares);
          })
          .filter(buy => buy.shares > 0);

        const buyDetails = state.positions.map(position => {
          const hasBuy = buys.filter(b => b.symbol === position.symbol);
          if (hasBuy.length > 0) {
            return hasBuy[0];
          } else {
            return new Buy(position.symbol, 0, position.shares, position.price, 0);
          }
        });

        const valueAfterBuys = buyDetails.reduce((acc, cur) => {
          return acc + cur.endShares * cur.price;
        }, 0);

        return buyDetails.map(
          buy =>
            new Buy(
              buy.symbol,
              buy.shares,
              buy.endShares,
              buy.price,
              buy.cost,
              round(((buy.endShares * buy.price) / valueAfterBuys) * 10000)
            )
        );
      } else {
        return new Array<Buy>();
      }
    },
    invalidTarget(state: VuexState): boolean {
      return getTotalTarget(state.positions) !== 100;
    },
    invalidFunds(state: VuexState): boolean {
      return !state.availableFunds || !(state.availableFunds > 0);
    }
  },
  mutations: {
    addPosition(state: VuexState, position: Position): void {
      state.positions = [...state.positions, position];
    },
    removePosition(state: VuexState, symbol: string): void {
      state.positions = state.positions.filter(p => p.symbol !== symbol);
    },
    updateAvailableFunds(state: VuexState, funds: number): void {
      state.availableFunds = funds;
    },
    initializeStore(state, version) {
      if (localStorage.getItem("store")) {
        const store = JSON.parse(localStorage.getItem("store") || "{}");
        this.replaceState({ ...state, ...store });
      }
    }
  },
  actions: {},
  modules: {}
});
