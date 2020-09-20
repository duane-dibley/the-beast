import React from 'react';
import { GeckoComponent } from '@common/views';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function GeckoRoute(): JSX.Element {
  return (
    <Container component="main" maxWidth={false}>
      <CssBaseline />
      <GeckoComponent />
    </Container>
  );
}
