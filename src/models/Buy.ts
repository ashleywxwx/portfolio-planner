export default class Buy {
  symbol: string;
  shares: number;

  constructor(symbol: string, shares: number) {
    this.symbol = symbol;
    this.shares = shares;
  }
}
