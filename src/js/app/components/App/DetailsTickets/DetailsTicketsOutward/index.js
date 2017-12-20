import React, { Component, PropTypes } from 'react'
import { NavigationActions } from 'react-navigation'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import moment from 'moment'

import InfoModalContainer from './../../../../containers/InfoModal'

import common from './../../../../../../styles'

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
      <View style={[common.marginTop20, common.box, common.backgroundColorWhite]}>
        <View style={[common.paddingTopBottom20, common.alignItems]}>
          <Text style={common.textPink}> OUTWARD </Text>
          <Text style={common.textBold}> {moment(this.props.selectedOutward.origin_time).format('DD/MM/YYYY')} </Text>
          <Text style={common.textNormal}> {this.props.selectedOutward.origin_station_id} </Text>
          <Text style={common.textBold}> {this.props.selectedOutward.origin_time.slice(-8, -3)} </Text>
          <Text style={common.textNormal}> {this.props.selectedOutward.destination_station_id} </Text>
          <Text style={common.textBold}> {this.props.selectedOutward.destination_time.slice(-8, -3)} </Text>
          <Text style={common.textNormal}> Changes</Text>
          <Text style={common.textBold}> {this.props.selectedOutward.changes} </Text>
        </View>
        <View style={[common.paddingTopBottom20, common.separator, common.backgroundColor]}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressInfoOutward()}>
            <View style={common.alignItems}>
              <Text style={[common.textMedium]}> SHOW MAP </Text>
            </View>
          </TouchableOpacity>
        </View>
        <InfoModalContainer links={this.props.selectedOutward.links} routeTrains={this.props.selectedOutward.legs}/>
      </View>
    )
  }
}
