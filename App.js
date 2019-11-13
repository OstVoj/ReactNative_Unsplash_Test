import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import reducer from "./app/redux/reducers";

import HomeScreen from "./app/screens/Home";
import UserScreen from "./app/screens/User";

console.disableYellowBox = true;

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  User: {
    screen: UserScreen
  }
});

AppNavigator.navigationOptions = {
  initialRouteName: "Home",
  header: null,
  headerLeft: null,
  headerRight: null
};

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
