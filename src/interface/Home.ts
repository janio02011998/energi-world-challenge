export interface ICryptoCurrency {
  name: string;
  symbol: string;
  taker_fee: number
  image: string;
  current_price: number;
}