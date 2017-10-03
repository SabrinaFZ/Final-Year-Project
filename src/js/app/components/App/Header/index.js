import React, { Component, PropTypes } from 'react'
import {View, Text, BackHandler } from 'react-native'
import { Icon } from 'react-native-elements'
// import { TouchableOpacity } from 'react-native'
// import { StackNavigator} from 'react-navigation'
// import StackTopHeader from './StackTopHeader'
// import StackSubHeader from './StackSubHeader'
//
// 'use strict'
// import { TabNavigator } from 'react-navigation'
// // Tab-Navigators
// import SelectOriginDestination from '../SelectOriginDestination'
//
// const routeConfiguration = {
//   StackTopHeader: {
//     screen: StackTopHeader
//   },
//   StackSubHeader: {
//     screen: StackSubHeader
//   },
// }
//
// const tabBarConfiguration = {
//   tabBarOptions:{
//     activeTintColor: 'white',
//     inactiveTintColor: 'blue',
//     activeBackgroundColor: 'blue',
//     inactiveBackgroundColor: 'white',
//   }
// }
//
// export const TabHeader = TabNavigator(routeConfiguration,tabBarConfiguration)

//import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import common from '../../../../../styles'
import { Header } from 'react-native-elements'

export default class CustomHeader extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this._BackAndroid.bind(this));
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress',this._BackAndroid.bind(this));
  }

  _BackAndroid=()=>{
   this.props.navigation.goBack();
   return false
  }

  static propTypes = {
    isApp: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }

  render() {
    if(this.props.isApp){
      right = <Icon name='shopping-cart' size={30} color='#fff' underlayColor= '#01A9DB' onPress= {() => this.props.navigation('ShoppingCart') } />
    } else{
      right = null
    }

    return (
      <Header backgroundColor='#01A9DB'
        leftComponent={<Icon name='arrow-back' size={30} color='#fff' underlayColor= '#01A9DB' onPress= {() => this.props.navigation.goBack() } />}
        centerComponent={{ text: this.props.name, style: { fontSize: 24, color: '#fff' } }}
        rightComponent={right}
      />

    )
  }
}
