import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import Home from '../screens/Home';
import Circle from '../screens/Circle';
import Connection from '../screens/Connection';

export default createStackNavigator(
  {
    Home,
    Circle,
    Connection
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions: {
      tabBarLabel: 'Home',
    }
  }
);
