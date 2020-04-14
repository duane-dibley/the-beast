declare namespace CompanyStylModule {
  export interface ICompanyStyl {
    test: string;
  }
}

declare const CompanyStylModule: CompanyStylModule.ICompanyStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CompanyStylModule.ICompanyStyl;
};

export = CompanyStylModule;
