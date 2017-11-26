import React, { Component, PropTypes } from 'react'
import { NavigationActions } from 'react-navigation'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import DetailsTicketsOutwardContainer from './../../../../../containers/DetailsTickets/DetailsTicketOutward'
import DetailsTicketsReturnContainer from './../../../../../containers/DetailsTickets/DetailsTicketReturn'
import AddCartButtonContainer from './../../../../../containers/AddCartButton'

import common from './../../../../../../../styles'

export default class DetailsTickets extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    addReturn: PropTypes.bool.isRequired,
    selectedOutward: PropTypes.object.isRequired,
    selectedReturn: PropTypes.object.isRequired
  }

  render(){
    let returnTicketInfo = null
    let total = this.props.selectedOutward.links[this.props.selectedOutward.selectedFare].totalPrice
    if(this.props.addReturn){
      returnTicketInfo = <DetailsTicketsReturnContainer />
      total = this.props.selectedReturn.links[this.props.selectedReturn.selectedFare].totalPrice
    }
    return(
      <ScrollView contentContainerStyle={[common.padding20, common.paddingTop40]}>
        <Text style={[common.textCenter, common.title]}> YOUR TICKETS </Text>
        <DetailsTicketsOutwardContainer />
        {returnTicketInfo}
        <View style={[common.row, common.spaceBetween, common.marginTop50, common.marginBottom40]}>
          <View style={[common.buttonActive, common.center]}>
            <Text style={common.textButton}>TOTAL: {(total/1000).toFixed(2)} £</Text>
          </View>
          <AddCartButtonContainer navigation={this.props.navigation} />
        </View>
      </ScrollView>
    )
  }

}
