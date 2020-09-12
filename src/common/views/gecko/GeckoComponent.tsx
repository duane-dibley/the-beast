import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import Button from '@material-ui/core/Button';
import { geckoCoinsList } from '@common/actions/geckoActions';

function GeckoComponent(props: IProps): JSX.Element {
  return (
    <Button onClick={(): AnyAction => props.actions.geckoCoinsList()} variant="contained">
      Button
    </Button>
  );
}

function mapDispatchToProps(dispatch: Dispatch): IProps {
  return { actions: bindActionCreators({ geckoCoinsList }, dispatch) };
}

function mapStateToProps(store: IStore): IProps {
  const { gecko } = store;
  const { coinsList } = gecko;
  return { coinsList };
}

interface IProps {
  actions?: {
    geckoCoinsList: typeof geckoCoinsList;
  };
  coinsList?: {
    id: string;
    name: string;
    symbol: string;
  }[];
}

export default connect(mapStateToProps, mapDispatchToProps)(GeckoComponent);
