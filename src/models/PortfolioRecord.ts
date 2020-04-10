import Position from "@/models/Position";

export default class PortfolioRecord extends Position {
  currentValue: number;
  currentAllocation: string;

  constructor(
    symbol: string,
    price: number,
    shares: number,
    target: number,
    currentValue: number,
    currentAllocation: string
  ) {
    super(symbol, price, shares, target);
    this.currentValue = currentValue;
    this.currentAllocation = currentAllocation;
  }
}
