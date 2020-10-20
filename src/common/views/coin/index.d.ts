interface ICoinState {
  coinData: any;
  coinList: {
    id: string;
    name: string;
    symbol: string;
  }[];
  currencyList: string[];
}
