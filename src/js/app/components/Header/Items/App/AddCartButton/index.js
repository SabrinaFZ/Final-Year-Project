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
    this.postOrders = this.postOrders.bind(this)
  }

  static propTypes = {
    shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedOutward: PropTypes.object.isRequired,
    selectedReturn: PropTypes.object.isRequired,
    addCart: PropTypes.bool.isRequired,
    addReturn: PropTypes.bool.isRequired,
    orders: PropTypes.object.isRequired,
    addShoppingCart: PropTypes.func.isRequired,
    setAddedCart: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired,
    setTrip: PropTypes.func.isRequired,
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
    if(this.props.shoppingCart.length == 0 && Object.keys(this.props.orders).length == 0){
      this.postOrders()
    } else {
      this.postTrips()
    }
    this.props.navigation.navigate('ShoppingCart')
  }

  async postOrders(){
    if(!this.props.addReturn){
      await this.props.setOrder('https://api-southern.stage.otrl.io/orders', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic Og==',
          'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
        },
        body: JSON.stringify({
          trip: {
            fares: {
              outwardSingle: this.props.selectedOutward.cheapest.outwardSingle,
              returnSingle: null,
              return: null
            },
            outwardJourney: {
              reserve: false,
              reservationPreferences: null,
            },
            returnJourney: {
              reserve: false
            },
              itso: false
            },
            channel: 'mobile',
            referrer: null,
            campaign: null
          })
        })
    } else {
      await this.props.setOrder('https://api-southern.stage.otrl.io/orders', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic Og==',
          'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
        },
        body: JSON.stringify({
          trip: {
            fares: {
              outwardSingle: null,
              returnSingle: null,
              return: this.props.selectedReturn.cheapest.outwardSingle
            },
            outwardJourney: {
              reserve: false,
              reservationPreferences: null,
            },
            returnJourney: {
              reserve: false,
              reservationPreferences: null
            },
              itso: false
            },
            channel: 'mobile',
            referrer: null,
            campaign: null
          })
        })
    }

  }

  async postTrips(){
    if(!this.props.addReturn){
      await this.props.setTrip(`https://api-southern.stage.otrl.io/orders/${this.props.orders.id}/trips`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic Og==',
          'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
          'x-customer-device': this.props.orders.deviceToken
        },
        body: JSON.stringify({
          fares: {
            outwardSingle: this.props.selectedOutward.cheapest.outwardSingle,
            returnSingle: null,
            return: null
          },
          outwardJourney: {
            reserve: false,
            reservationPreferences: null,
          },
          returnJourney: {
            reserve: false
          },
          itso: false,
          channel: 'mobile',
          referrer: null,
          campaign: null
        })
      })
    } else {
      await this.props.setTrip(`https://api-southern.stage.otrl.io/orders/${this.props.orders.id}/trips`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic Og==',
          'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
          'x-customer-device': this.props.orders.deviceToken
        },
        body: JSON.stringify({
          fares: {
            outwardSingle: null,
            returnSingle: null,
            return: this.props.selectedReturn.cheapest.outwardSingle
          },
          outwardJourney: {
            reserve: false,
            reservationPreferences: null
          },
          returnJourney: {
            reserve: false,
            reservationPreferences: null
          },
          itso: false,
          channel: 'mobile',
          referrer: null,
          campaign: null
        })
      })
    }

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
