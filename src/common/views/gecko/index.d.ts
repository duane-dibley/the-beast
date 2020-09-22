interface IGeckoState {
  coinData: any;
  coinsList: {
    id: string;
    name: string;
    symbol: string;
  }[];
  currencyList: string[];
}
