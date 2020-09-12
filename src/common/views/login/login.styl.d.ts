declare namespace LoginStylNamespace {
  export interface ILoginStyl {
    avatar: string;
  }
}

declare const LoginStylModule: LoginStylNamespace.ILoginStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LoginStylNamespace.ILoginStyl;
};

export = LoginStylModule;
