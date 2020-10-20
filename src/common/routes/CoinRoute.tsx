import React from 'react';
import { CoinComponent } from '@common/views';
// import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function CoinRoute(): JSX.Element {
  return (
    // <Container component="main" maxWidth={false}>
    <>
      <CssBaseline />
      <CoinComponent />
    </>
    // </Container>
  );
}
