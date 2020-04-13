export default class Buy {
  symbol: string;
  shares: number;
  endShares: number;
  price: number;
  cost: number;
  endAllocation?: number;

  constructor(symbol: string, shares: number, endShares: number, price: number, cost: number, endAllocation?: number) {
    this.symbol = symbol;
    this.shares = shares;
    this.endShares = endShares;
    this.price = price;
    this.cost = cost;
    this.endAllocation = endAllocation;
  }
}
