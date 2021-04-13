import * as React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
// import { colors } from '../constants';

// navigation stacks
import StackHome from './StackHome';
import StackConnect from './StackConnect';
import StackProfile from './StackProfile';

// components
//import CustomTabBar from '../components/CustomTabBar';

const BottomTabNavigator = createBottomTabNavigator(
  {
    StackHome,
    StackConnect,
    StackProfile
  },
  {
    initialRouteName: 'StackConnect',
    //tabBarComponent: (props) => <CustomTabBar {...props} />,
    // tabBarOptions: {
    //   activeTintColor: colors.white,
    //   inactiveTintColor: colors.greyInactive,
    //   style: {
    //     backgroundColor: colors.grey,
    //     borderTopWidth: 0
    //   }
    // }
  }
);

export default BottomTabNavigator;