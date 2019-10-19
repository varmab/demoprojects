import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './Home'
import About from './About'

var AppNavigator=createStackNavigator( { 
  Home: {
      screen: Home 
  },
  About: {
      screen: About
  }
},
{
  initialRouteName:'Home'
})

var AppContainer=createAppContainer(AppNavigator);

export default AppContainer;