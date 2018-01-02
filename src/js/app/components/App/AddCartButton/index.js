import React, { Component, PropTypes } from 'react'
import { NavigationActions } from 'react-navigation'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import common from './../../../../../styles'

export default class AddCartButton extends Component{
  constructor(props){
    super(props)

    this.handleOnPress = this.handleOnPress.bind(this)
    this.postOrders = this.postOrders.bind(this)
    this.updateTrips = this.updateTrips.bind(this)
  }

  static propTypes = {
    shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedOutward: PropTypes.object.isRequired,
    selectedReturn: PropTypes.object.isRequired,
    addCart: PropTypes.bool.isRequired,
    addReturn: PropTypes.bool.isRequired,
    orders: PropTypes.object.isRequired,
    isDeletedTrip: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    addShoppingCart: PropTypes.func.isRequired,
    setAddedCart: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired,
    setTrip: PropTypes.func.isRequired,
    setDeletedTrip: PropTypes.func.isRequired
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
      let index = 0
      //if we don't delete in shopping cart, just update the next element on the array
      if(this.props.orders.trips.length === this.props.shoppingCart.length + 1){
        if(this.props.orders.trips.length != 0){
          index = this.props.orders.trips.length-1
        } 
        this.props.orders.trips.splice(index, 1)
        this.updateTrips(this.props.orders.trips)
      }
      else{
        this.postTrips()
      }
    }
    this.props.navigation.navigate('ShoppingCart')
  }

  postOrders(){
    let order = {
      id: Math.floor((Math.random() * 100) + 1),
      trips:[
        {
          outward: this.props.selectedOutward,
          return: this.props.selectedReturn
        }
      ],
      status: 'NOT_PAID'
    }
    this.props.setOrder(order)
  }

  postTrips(){
    let newTrip = {
      outward: this.props.selectedOutward,
      return: this.props.selectedReturn
    }
    let aux = []
    aux = this.props.orders.trips.concat(newTrip)
    let trip = {
      id: Math.floor((Math.random() * 100) + 1),
      trips: aux,
      status: 'NOT_PAID'
    }
    this.props.setOrder(trip)
  }

  updateTrips(trips) {
    let newTrip = {
      outward: this.props.selectedOutward,
      return: this.props.selectedReturn
    }
    let aux = []
    aux = trips.concat(newTrip)
    let trip = {
      id: Math.floor((Math.random() * 100) + 1),
      trips: aux,
      status: 'NOT_PAID'
    }
  
    this.props.setOrder(trip)
  }

  render(){
    return(
      <View style={common.buttonNext} >
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPress()}>
          <Text style={common.textButtonNext}> ADD TO CART </Text>
        </TouchableOpacity>
      </View>
    )
  }

}
