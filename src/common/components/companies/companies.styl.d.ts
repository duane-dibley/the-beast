declare namespace CompaniesStylModule {
  export interface ICompaniesStyl {
    test: string;
  }
}

declare const CompaniesStylModule: CompaniesStylModule.ICompaniesStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CompaniesStylModule.ICompaniesStyl;
};

export = CompaniesStylModule;
