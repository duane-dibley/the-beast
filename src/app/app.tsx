import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setData } from './actions';

export default connect(mapStateToProps, mapDispatchToProps)(App);

function mapDispatchToProps(dispatch: Dispatch) {
  return { actions: bindActionCreators({ setData }, dispatch) };
}

function mapStateToProps(state: any) {
  console.log('mapStateToProps ', state);
  return state;
}

// functional JSX Element
function App(): JSX.Element {
  return <div>appdiv content</div>;
}

// Class components where state is applied
// class App extends Component<{}> {
//   public render(): ReactNode {
//     return <div>App div</div>;
//   }
// }
