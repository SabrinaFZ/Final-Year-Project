'use strict'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import common from '../../../../styles'
import { Icon, Button } from 'react-native-elements'
import BackPageComponent from '../BackComponent'

export default class Menu extends  React.Component {
  render(){
    return(
      <View style={common.menuContainer}>
        {/* <Button
          raised
          onPress={ () => this.props.navigation.navigate('StackApp') }
          icon={{name: 'shopping-basket', size: 36}}
          title='Buy Tickets'
          buttonStyle={common.button}
          textStyle={common.textButton}
        />

          <Button
            raised
            onPress={ () => this.props.navigation.navigate('YourTickets') }
            icon={{name: 'ticket', size: 36, type: 'entypo'}}
            title='Your Tickets'
            buttonStyle={common.button}
            textStyle={common.textButton}
          />

          <Button
            raised
            onPress={ () => this.props.navigation.navigate('Login') }
            icon={{name: 'login', size: 36, type: 'entypo'}}
            title='Login'
            buttonStyle={common.button}
            textStyle={common.textButton}
          />

          <Button
            raised
            onPress={ () => this.props.navigation.navigate('SignUp') }
            icon={{name: 'create', size: 36}}
            title='Sign Up'
            buttonStyle={common.button}
            textStyle={common.textButton}
          /> */}
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
