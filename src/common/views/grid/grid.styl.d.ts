declare namespace GridStylNamespace {
  export interface IGridStyl {
    test: string;
  }
}

declare const GridStylModule: GridStylNamespace.IGridStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GridStylNamespace.IGridStyl;
};

export = GridStylModule;
