import { Layouts, Responsive, ResponsiveProps, WidthProvider, WidthProviderProps } from 'react-grid-layout';
import { Dispatch, bindActionCreators } from 'redux';
import React, { ComponentClass } from 'react';
import { connect } from 'react-redux';
import './grid.styl';

const ResponsiveGridLayout: ComponentClass<ResponsiveProps, WidthProviderProps> = WidthProvider(Responsive);

const layouts: Layouts = {
  lg: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 }
  ]
};

function GridComponent(/* props: IProps */): JSX.Element {
  // {lg: layout1, md: layout2, ...}
  return (
    <ResponsiveGridLayout className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      <div className="test" key="1">testing red color of css</div>
      <div key="2">2</div>
      <div key="3">3</div>
    </ResponsiveGridLayout>
  );
}

function mapDispatchToProps(dispatch: Dispatch): IProps {
  return { actions: bindActionCreators({}, dispatch) };
}

function mapStateToProps(/* store: IStore */): IProps {
  return { store: {} };
}

// interface IConnectDispatch { }

interface IProps {
  actions?: {};
  store?: {};
}

export default connect(mapStateToProps, mapDispatchToProps)(GridComponent);
