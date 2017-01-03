import React, { Component, PropTypes } from "react";
import ReactDom from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

// Counter -- React component
class Counter extends Component{
  render(){
    const { value, onIncreaseClick, onDecreaseClick } = this.props;
    return(
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
        <button onClick={onDecreaseClick}>Decrease</button>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired,
  onDecreaseClick: PropTypes.func.isRequired
}

//action
const increaseAction = { type: "INCREASE" };
const decreaseAction = { type: "DECREASE" };

//Reducer
function counterReducer(state = {count: 0}, action){
  const count = state.count;
  switch (action.type) {
    case "INCREASE":
      return { count: count + 1 };
    case "DECREASE":
      return { count: count - 1 };
    default:
      return state;
  }
}

//store
const store = createStore(counterReducer);

//Map Redux state component
function mapStateToProps(state){
  return {
    value: state.count
  }
}

//Map Redux actions to component props
function mapDispatchToProps(dispatch){
  return {
      onIncreaseClick: () => dispatch(increaseAction),
      onDecreaseClick: () => dispatch(decreaseAction)
  }
}

//Connected component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

ReactDom.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)
