import React, { Component }from 'react'
import { BackHandler, Button, Text, View, } from 'react-native'
import { Icon } from 'react-native-elements'


export default class ShoppingCart extends Component {

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
