import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import common from './../../../../../../../styles'

export default class DetailsTickets extends Component{
  constructor(props){
    super(props)

    this.handleOnPress = this.handleOnPress.bind(this)
  }

  static propTypes = {
    selectedOutward: PropTypes.object.isRequired,
    selectedReturn: PropTypes.object.isRequired,
    addReturn: PropTypes.bool.isRequired,
    journeyPlan: PropTypes.object.isRequired,
    addedCart: PropTypes.bool.isRequired,
    addShoppingCart: PropTypes.func.isRequired,
    addedCart: PropTypes.func.isRequired,
  }

  getTrainsName(trainId){
    let station = this.props.journeyPlan.links[trainId]
    return station.name
  }

  getTrainsCRS(trainId){
    let station = this.props.journeyPlan.links[trainId]
    return station.crs
  }

  getTicketType(ticketType){
    let ticket = this.props.journeyPlan.links[ticketType]
    return ticket.name
  }

  handleOnPress(){
    let item = {
      outward: this.props.selectedOutward,
      return: this.props.selectedReturn,
    }
    this.props.addShoppingCart(item)
    this.props.addedCart(!this.props.addCart)
    this.props.navigation.navigate('ShoppingCart')
  }

  render(){
    let returnTicketInfo =  null
    if(this.props.addReturn){
      returnTicketInfo =
      <View style={[common.marginTop20, common.box, common.paddingTopBottom20, common.backgroundColorWhite]}>
        <View style={[common.alignItems]}>
          <Text style={common.textPink}> Return </Text>
          <Text style={common.textBold}> {this.props.selectedReturn.origin_time.slice(0, 10)} </Text>
          <Text style={common.textNormal}> {this.getTrainsCRS(this.props.selectedReturn.origin_station)} </Text>
          <Text style={common.textBold}> {this.props.selectedReturn.origin_time.slice(-8, -3)} </Text>
          <Text style={common.textNormal}> {this.getTrainsCRS(this.props.selectedReturn.destination_station)} </Text>
          <Text style={common.textBold}> {this.props.selectedReturn.destination_time.slice(-8, -3)} </Text>
          <Text style={common.textNormal}> Changes: {this.props.selectedReturn.changes} </Text>
          <Text style={[common.marginTop20, common.textPink, common.textCenter]}> {((this.props.selectedReturn.cheapest)/1000).toFixed(2)} £ </Text>
        </View>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={[common.marginTop20, common.separator]}>
            <Text style={[common.paddingTop20, common.textCenter, common.textBold]}> Info </Text>
          </View>
        </TouchableOpacity>
      </View>
    }
    return(
      <ScrollView contentContainerStyle={[common.padding40]}>
        <Text style={[common.textCenter, common.title]}> Your Tickets </Text>
        <View style={[common.marginTop20, common.box, common.paddingTopBottom20, common.backgroundColorWhite]}>
          <View style={[common.alignItems]}>
            <Text style={common.textPink}> Outward </Text>
            <Text style={common.textBold}> {this.props.selectedOutward.origin_time.slice(0, 10)} </Text>
            <Text style={common.textNormal}> {this.getTrainsCRS(this.props.selectedOutward.origin_station)} </Text>
            <Text style={common.textBold}> {this.props.selectedOutward.origin_time.slice(-8, -3)} </Text>
            <Text style={common.textNormal}> {this.getTrainsCRS(this.props.selectedOutward.destination_station)} </Text>
            <Text style={common.textBold}> {this.props.selectedOutward.destination_time.slice(-8, -3)} </Text>
            <Text style={common.textNormal}> Changes: {this.props.selectedOutward.changes} </Text>
            <Text style={[common.marginTop20, common.textPink, common.textCenter]}> {((this.props.selectedOutward.cheapest)/1000).toFixed(2)} £ </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={[common.marginTop20, common.separator]}>
              <Text style={[common.paddingTop20, common.textCenter, common.textBold]}> Info </Text>
            </View>
          </TouchableOpacity>
        </View>
        {returnTicketInfo}
        <View style={[common.row, common.end,  common.marginTop50, common.marginBottom40]}>
          <TouchableOpacity activeOpacity={0.8} style={common.buttonNext} onPress={() => this.handleOnPress()}>
            <Text style={common.textButtonNext}> ADD TO CART </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

}
