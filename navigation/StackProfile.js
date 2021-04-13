import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import Profile from '../screens/Profile';

export default createStackNavigator(
  {
    Profile
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarLabel: 'Profile',
    }
  }
);