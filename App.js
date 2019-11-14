import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

import reducer from './app/redux/reducers';

import HomeScreen from './app/screens/Home';
import UserScreen from './app/screens/User';

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
  initialRouteName: 'Home',
  header: null,
  headerLeft: null,
  headerRight: null
};

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(platform)}>
          <AppContainer />
        </StyleProvider>
      </Provider>
    );
  }
}
