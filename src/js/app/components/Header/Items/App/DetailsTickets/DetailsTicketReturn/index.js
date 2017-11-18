import React, { Component, PropTypes } from 'react'
import { NavigationActions } from 'react-navigation'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import InfoModalContainer from './../../../../../../containers/InfoModal'

import common from './../../../../../../../../styles'

export default class DetailsTicketsReturn extends Component{
  constructor(props){
    super(props)

    this.handleOnPressInfoReturn = this.handleOnPressInfoReturn.bind(this)
  }

  static propTypes = {
    selectedReturn: PropTypes.object.isRequired,
    journeyPlan: PropTypes.object.isRequired,
    openModalInfoReturn: PropTypes.bool.isRequired,
    setOpenModalInfoReturn: PropTypes.func.isRequired
  }

  handleOnPressInfoReturn(){
    this.props.setOpenModalInfoReturn(true)
    this.forceUpdate()
  }

  render(){
    return(
      <View style={[common.marginTop20, common.box, common.paddingTopBottom20, common.backgroundColorWhite]}>
        <View style={[common.alignItems]}>
          <Text style={common.textPink}> RETURN </Text>
          <Text style={common.textBold}> {this.props.selectedReturn.origin_time.slice(0, 10)} </Text>
          <Text style={common.textNormal}> {this.props.selectedReturn.origin_station_id} </Text>
          <Text style={common.textBold}> {this.props.selectedReturn.origin_time.slice(-8, -3)} </Text>
          <Text style={common.textNormal}> {this.props.selectedReturn.destination_station_id} </Text>
          <Text style={common.textBold}> {this.props.selectedReturn.destination_time.slice(-8, -3)} </Text>
          <Text style={common.textNormal}> Changes: {this.props.selectedReturn.changes} </Text>
          <Text style={[common.marginTop20, common.textPink, common.textCenter]}> {((this.props.journeyPlan.links[this.props.selectedReturn.selectedFare].totalPrice)/1000).toFixed(2)} £ </Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressInfoReturn()}>
          <View style={[common.marginTop20, common.separator]}>
            <Text style={[common.paddingTop20, common.textCenter, common.textBold]}> INFO </Text>
          </View>
        </TouchableOpacity>
        <InfoModalContainer links={this.props.selectedReturn.links} routeTrains={this.props.selectedReturn.legs}/>
      </View>
    )
  }
}
