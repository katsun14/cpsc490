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
    tabBarOptions: {
      activeTintColor: "#000000",
      // inactiveTintColor: "#000000",
      // style: {
      //   backgroundColor: "#ffffff",
      //   borderTopWidth: 0
      // }
    }
  },
);

export default BottomTabNavigator;