import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class ShoppingCart extends Component {
  constructor(props){
    super(props)
  }
  

  render(){
    return(
      <View>
        <Text>Shopping Cart</Text>
      </View>
    )
  }
}
