import React, { Component }from 'react'
import {Button, Text, View, } from 'react-native'
import { Icon } from 'react-native-elements'


export default class ShoppingCartButton extends Component {
  render() {
    return (
      <View>
        <Icon name='shopping-cart' size={30} color='#fff' underlayColor= '#e9418b'
          onPress={() => this.props.navigation.navigate('ShoppingCart')}
        />
      </View>
    )
  }
}
