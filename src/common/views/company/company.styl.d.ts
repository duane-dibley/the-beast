declare namespace CompanyStylNamespace {
  export interface ICompanyStyl {
    'flex-grow-row': string;
    'flex-row': string;
  }
}

declare const CompanyStylModule: CompanyStylNamespace.ICompanyStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CompanyStylNamespace.ICompanyStyl;
};

export = CompanyStylModule;
