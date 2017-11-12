import React, { Component, PropTypes } from 'react'
import { NavigationActions } from 'react-navigation'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import InfoModalContainer from './../../../../../../containers/InfoModal'

import common from './../../../../../../../../styles'

export default class DetailsTicketsOutward extends Component{
  constructor(props){
    super(props)

    this.handleOnPressInfoOutward = this.handleOnPressInfoOutward.bind(this)
  }

  static propTypes = {
    selectedOutward: PropTypes.object.isRequired,
    journeyPlan: PropTypes.object.isRequired,
    openModalInfoOutward:PropTypes.bool.isRequired,
    setOpenModalInfoOutward: PropTypes.func.isRequired,
  }

  handleOnPressInfoOutward(){
    this.props.setOpenModalInfoOutward(true)
    this.forceUpdate()
  }

  render(){
    return(
      <View style={[common.marginTop20, common.box, common.paddingTopBottom20, common.backgroundColorWhite]}>
        <View style={[common.alignItems]}>
          <Text style={common.textPink}> OUTWARD </Text>
          <Text style={common.textBold}> {this.props.selectedOutward.origin_time.slice(0, 10)} </Text>
          <Text style={common.textNormal}> {this.props.selectedOutward.origin_station_id} </Text>
          <Text style={common.textBold}> {this.props.selectedOutward.origin_time.slice(-8, -3)} </Text>
          <Text style={common.textNormal}> {this.props.selectedOutward.destination_station_id} </Text>
          <Text style={common.textBold}> {this.props.selectedOutward.destination_time.slice(-8, -3)} </Text>
          <Text style={common.textNormal}> Changes: {this.props.selectedOutward.changes} </Text>
          <Text style={[common.marginTop20, common.textPink, common.textCenter]}> {((this.props.selectedOutward.cheapest)/1000).toFixed(2)} £ </Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressInfoOutward()}>
          <View style={[common.marginTop20, common.separator]}>
            <Text style={[common.paddingTop20, common.textCenter, common.textBold]}> INFO </Text>
          </View>
        </TouchableOpacity>
        <InfoModalContainer routeTrains={this.props.selectedOutward.legs}/>
      </View>
    )
  }
}
