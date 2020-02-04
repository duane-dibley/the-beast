import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';

// export default function hoc(WrappedComponent: ReactNode): any {
//   return class ContextProviderHoc extends Component {
//     static get propTypes() {
//       return {
//         context: PropTypes.element
//       }
//     }

//     static defaultProps: any = {
//       context: {}
//     };

//     static childContextTypes: any = {
//       _insertCss: PropTypes.func,
//     };

//     getChildContext(): any {
//       const { context } = this.props;
//       return context;
//     }

//     render(): ReactNode {
//       return <WrappedComponent {...this.props} />;
//     }
//   };
// }

// class ContextProviderHoc extends Component {
//     static childContextTypes: any = {
//     _insertCss: func,
//   };

//   getChildContext(): any {
//     const { context } = this.props;
//     return context;
//   }

//   render(): JSX.Element {
//     return <App {...this.props} />;
//   }
// }

// export default class Hoc extends React.Component<any, any> {
//   static childContextTypes: any = {
//     _insertCss: func,
//   };

//   getChildContext(): any {
//     const { context } = this.props;
//     return context;
//   }

//   render(): JSX.Element {
//     return <App {...this.props} />;
//   }
// }
