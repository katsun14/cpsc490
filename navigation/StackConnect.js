import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import Connect from '../screens/Connect';

export default createStackNavigator(
  {
    Connect
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarLabel: 'Connect',
    }
  }
);