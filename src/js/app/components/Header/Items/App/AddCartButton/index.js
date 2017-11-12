import React, { Component, PropTypes } from 'react'
import { NavigationActions } from 'react-navigation'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import common from './../../../../../../../styles'

export default class AddCartButton extends Component{
  constructor(props){
    super(props)

    this.handleOnPress = this.handleOnPress.bind(this)
  }

  static propTypes = {
    shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedOutward: PropTypes.object.isRequired,
    selectedReturn: PropTypes.object.isRequired,
    addCart: PropTypes.bool.isRequired,
    addReturn: PropTypes.bool.isRequired,
    addShoppingCart: PropTypes.func.isRequired,
    setAddedCart: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  }

  handleOnPress(){
    let item = {
      outward: this.props.selectedOutward,
      return: this.props.selectedReturn,
      hasReturn: this.props.addReturn,
    }
    if(!this.props.addCart){
      this.props.addShoppingCart(item)
      this.props.setAddedCart(!this.props.addCart)
    } else {
      this.props.shoppingCart.splice(this.props.shoppingCart.length-1,1)
      this.props.update(this.props.shoppingCart)
      this.props.addShoppingCart(item)
      this.forceUpdate()
    }
    this.props.navigation.navigate('ShoppingCart')
  }

  render(){
    return(
      <View style={[common.row, common.end,  common.marginTop50, common.marginBottom40]}>
        <TouchableOpacity activeOpacity={0.8} style={common.buttonNext} onPress={() => this.handleOnPress()}>
          <Text style={common.textButtonNext}> ADD TO CART </Text>
        </TouchableOpacity>
      </View>
    )
  }

}
