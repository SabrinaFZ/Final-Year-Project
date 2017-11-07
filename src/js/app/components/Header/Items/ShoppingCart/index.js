import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'

import common from './../../../../../../styles'

export default class ShoppingCart extends Component {
  constructor(props){
    super(props)

    this._BackAndroid = this._BackAndroid.bind(this)
    this.handleOnPressDelete = this.handleOnPressDelete.bind(this)
  }

  static propTypes = {
    shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
    journeyPlan: PropTypes.object.isRequired,
    addCart: PropTypes.bool.isRequired,
    update: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if(this.props.addCart){
      BackHandler.addEventListener('hardwareBackPress',this._BackAndroid)
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress',this._BackAndroid)
  }

   _BackAndroid=()=>{
    return true
  }

  handleOnPressDelete(index){
    this.props.shoppingCart.splice(index,1)
    this.props.update(this.props.shoppingCart)
    this.forceUpdate()
  }

  render(){
    let shoppingCart = null
    if(this.props.shoppingCart.length != 0){
      shoppingCart = this.props.shoppingCart.map((item, index) => {
        let returnInfo = null
        if(item.hasReturn){
          returnInfo =
          <View style={common.marginTop20}>
            <Text style={common.textPink}> RETURN </Text>
            <Text style={common.textNormal}> {item.return.origin_station_name} </Text>
            <Text style={common.textBold}> {item.return.origin_time.slice(-8, -3)} </Text>
            <Text style={common.textNormal}> {item.return.destination_station_name} </Text>
            <Text style={common.textBold}> {item.return.destination_time.slice(-8, -3)} </Text>
            <Text style={common.textNormal}> Changes: {item.return.changes} </Text>
            <Text style={[common.textPink]}> {((item.return.cheapest)/1000).toFixed(2)} £ </Text>
          </View>
        }
        return(
          <View key={index} style={[common.marginTop20, common.box, common.padding10, common.backgroundColorWhite]}>
            <View>
              <Text style={common.textPink}> OUTWARD </Text>
              <Text style={common.textNormal}> {item.outward.origin_station_name} </Text>
              <Text style={common.textBold}> {item.outward.origin_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> {item.outward.destination_station_name} </Text>
              <Text style={common.textBold}> {item.outward.destination_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> Changes: {item.outward.changes} </Text>
              <Text style={[common.textPink]}> {((item.outward.cheapest)/1000).toFixed(2)} £ </Text>
            </View>
            {returnInfo}
            <TouchableOpacity activeOpacity={0.8} style={common.marginTop20}>
              <View style={[common.separator]}>
                <Text style={[common.padding10, common.textCenter, common.textBold]}> INFO </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressDelete(index)}>
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
      shoppingCart =
      <View>
        <Text style={[common.textCenter, common.textPink]}>No tickets!</Text>
      </View>
    }
    return(
      <ScrollView contentContainerStyle={common.padding40}>
        {shoppingCart}
      </ScrollView>
    )
  }
}
