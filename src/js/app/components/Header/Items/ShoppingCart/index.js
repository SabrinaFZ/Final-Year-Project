import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'

import common from './../../../../../../styles'

export default class ShoppingCart extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
    journeyPlan: PropTypes.object.isRequired,
    addCart: PropTypes.bool.isRequired,
  }

  render(){
    let shoppingCart = null
    let homeButton = null
    if(this.props.shoppingCart.length != 0){
      console.log('1')
      // homeButton =
      // <View>
      //   <TouchableOpacity activeOpacity={0.8}>
      //     <Text style={[common.textCenter, common.textBold]}> ANOTHER PURCHASE </Text>
      //   </TouchableOpacity>
      // </View>
      shoppingCart = this.props.shoppingCart.map((item, index) => {
        return(
          <View key={index} style={[common.marginTop20, common.box, common.padding10, common.backgroundColorWhite]}>
            <View>
              <Text style={common.textNormal}> {item.outward.origin_station_name} </Text>
              <Text style={common.textBold}> {item.outward.origin_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> {item.outward.destination_station_name} </Text>
              <Text style={common.textBold}> {item.outward.destination_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> Changes: {item.outward.changes} </Text>
              <Text style={[common.marginTop20, common.textPink]}> {((item.outward.cheapest)/1000).toFixed(2)} £ </Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={common.marginTop20}>
              <View style={[common.separator]}>
                <Text style={[common.padding10, common.textCenter, common.textBold]}> INFO </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <View style={[common.separator]}>
                <Text style={[common.padding10, common.textCenter, common.textBold]}> DELETE </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <View style={[common.separator]}>
                <Text style={[common.padding10, common.textCenter, common.textBold]}> PAY </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      })
    } else {
      console.log('2')
      shoppingCart =
      <View>
        <Text style={[common.textCenter, common.textPink]}>No tickets!</Text>
      </View>
    }
    return(
      <ScrollView contentContainerStyle={common.padding40}>
        {homeButton}
        {shoppingCart}
      </ScrollView>
    )
  }
}
