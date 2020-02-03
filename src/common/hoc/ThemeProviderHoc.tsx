import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@styles';

export default function hoc(WrappedComponent: JSX.Element): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      {WrappedComponent}
    </ThemeProvider>
  );
}
