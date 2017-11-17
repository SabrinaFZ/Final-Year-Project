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
    this.state = {
      flag: false
    }
  }

  static propTypes = {
    shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedOutward: PropTypes.object.isRequired,
    selectedReturn: PropTypes.object.isRequired,
    addCart: PropTypes.bool.isRequired,
    addReturn: PropTypes.bool.isRequired,
    deletedJourney: PropTypes.bool.isRequired,
    orders: PropTypes.object.isRequired,
    isAnotherTrip: PropTypes.bool.isRequired,
    addShoppingCart: PropTypes.func.isRequired,
    setAddedCart: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired,
    setTrip: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(newProps){
    console.log(newProps.isAnotherTrip)
    console.log(this.props.orders)
    if(newProps.deletedJourney){
      console.log('1')
      if(!newProps.isAnotherTrip){
        this.props.get(`https://api-southern.stage.otrl.io/orders/${newProps.orders.id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic Og==',
            'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
            'x-customer-device': newProps.orders.deviceToken
          }
        })
      }
      else if(newProps.orders.trips != this.props.orders.trips){
        console.log('2')
        this.postTrips()
      }
    }
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
    }

    if(Object.keys(this.props.orders).length == 0){
      this.postOrders()
    } else {
      let link = null
      console.log(this.props.orders.trips.length)
      console.log(this.props.shoppingCart.length)
      if(this.props.orders.trips.length === this.props.shoppingCart.length + 1){
        if(this.props.orders.trips.length != 0){
          console.log('aqui1')
          link = this.props.orders.trips[this.props.orders.trips.length-1]
        } else {
          console.log('aqui2')
          link = this.props.orders.trips[0]
        }
        this.props.delete(`https://api-southern.stage.otrl.io`+link, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic Og==',
            'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
            'x-customer-device': this.props.orders.deviceToken
          }
        })
      }
      else{
        console.log('aqui3')
        this.postTrips()
      }
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
          channel: 'web',
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
