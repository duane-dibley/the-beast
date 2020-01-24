interface IAppState {
  data: string;
}

interface IInitDataState {
  message: string;
}

interface Window {
  // INIT_DATA: { data: string };
  INIT_DATA: IInitDataState;
}
