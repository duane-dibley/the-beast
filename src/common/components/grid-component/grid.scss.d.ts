declare namespace GridScssModule {
  export interface IGridScss {
    test: string;
  }
}

declare const GridScssModule: GridScssModule.IGridScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GridScssModule.IGridScss;
};

export = GridScssModule;
