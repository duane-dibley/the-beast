import React from 'react';
import Button from '@material-ui/core/Button';
//
import { AnyAction } from 'redux';

export default function OrderBookComponent(props: IProps): JSX.Element {
  return <Button onClick={() => props.krakenOrderBook()}>ORDER</Button>;
}

interface IProps {
  krakenOrderBook: () => AnyAction;
}
