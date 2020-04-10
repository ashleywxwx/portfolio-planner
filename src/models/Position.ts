export default class Position {
  symbol: string;
  price: number;
  shares: number;
  target: number;

  constructor(symbol: string, price: number, shares: number, target: number) {
    this.symbol = symbol;
    this.price = price;
    this.shares = shares;
    this.target = target;
  }
}
