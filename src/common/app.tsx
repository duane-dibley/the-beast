// import StyleContext from 'isomorphic-style-loader/StyleContext';
// import React from 'react';
// import { ContextProvidorHoc, StaticRouterHoc, StoreProviderHoc, ThemeProviderHoc } from '@hoc';
// import AppRoutes from '@routes';

// export default function app(props: IContext): JSX.Element {
//   return ThemeProviderHoc(
//     StoreProviderHoc(
//       StaticRouterHoc(
//         <StyleContext.Provider value={{ insertCss }}>
//           <ContextProvidorHoc context={context}>
//             <AppRoutes />
//           </ContextProvidorHoc>
//         </StyleContext.Provider>,
//         req.url,
//         context
//       ),
//       store
//     )
//   );
// }
