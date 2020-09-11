import React from 'react';
import { CompanyComponent } from '@common/views';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function CompanyRoute(): JSX.Element {
  return (
    <Container component="main" maxWidth={false}>
      <CssBaseline />
      <CompanyComponent />
    </Container>
  );
}
