import React from 'react';
import { LoginComponent } from '@common/views';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function LoginRoute(): JSX.Element {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <LoginComponent />
    </Container>
  );
}
