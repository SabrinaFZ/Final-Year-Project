import React, {Component} from 'react'

import Welcome from '../Welcome'

import { TabNavigator, TabView } from 'react-navigation'

import {
  View,
  StyleSheet,
  Text
} from 'react-native'

// class Header extends Component {
//
//   render(){
//     return(
//       <View style={headerStyles.container}>
//         <View style={headerStyles.nav} />
//       </View>
//     )
//   }
//
// }

const Header = TabNavigator({
  TabItem1: {
      screen: Welcome,
      navigationOptions: {
          drawerLabel: 'Gas',
          tabBarLabel: "Gas",
      }
  },
  TabItem2: {
      screen: Welcome,
      navigationOptions: {
          drawerLabel: 'Elec',
          tabBarLabel: "Elec",
      }
  }
  }, {
      tabBarOptions: {
        showIcon: true,
        showLabel: true,
        labelStyle: {
        fontSize: 18,
        },
      },
      tabBarPosition: 'top',
      //swipeEnabled: true,
      //initialRouteName: 'TabItem1',
});



const headerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

  },
  nav: {
    flex:1,
    backgroundColor: '#2E9AFE',
    height: 80,
  }

});

export default Header
