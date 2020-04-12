import withStyles from 'isomorphic-style-loader/withStyles';
import React from 'react';
//
import Styles from './companies.styl';

function CompaniesComponent(): JSX.Element {
  return (
    <div>CompaniesComponent</div>
  );
}

export default withStyles(Styles)(CompaniesComponent);
