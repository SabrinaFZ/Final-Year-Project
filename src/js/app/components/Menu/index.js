'use strict'
import React from 'react'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import common from '../../../../styles'
import { Icon, Button } from 'react-native-elements'
import BackPageComponent from '../BackComponent'

export default class Menu extends  React.Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this._BackAndroid.bind(this));
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress',this._BackAndroid.bind(this));
  }

  _BackAndroid=()=>{
   this.props.navigation.goBack();
   return true
  }
  
  render(){
    return(
      <View style={common.menuContainer}>
        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate('StackApp')  }
            style = {common.containerMenu1}
            activeOpacity={0.8}
            >
          <Icon
            name='shopping-basket'
            color='#F2F2F2'
            size={36}
          />
          <Text style={common.textMenu2}>{'Buy Tickets'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate('YourTickets') }
            style = {common.containerMenu2} activeOpacity={0.8}>
          <Icon
            name='ticket'
            color='#F2F2F2'
            size={36}
            type='entypo'
          />
          <Text style={common.textMenu1}>{'Your Tickets'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate('Login') }
          style = {common.containerMenu3} activeOpacity={0.8}>
          <Icon
            name='login'
            color='#F2F2F2'
            size={36}
            type='entypo'
          />
          <Text style={common.textMenu2}>{'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate('SignUp') }
          style = {common.containerMenu4} activeOpacity={0.8}>
          <Icon
            name='create'
            color='#F2F2F2'
            size={36}
          />
          <Text style={common.textMenu1}>{'Sign Up'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
