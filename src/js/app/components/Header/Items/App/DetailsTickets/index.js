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
  }

  render(){
    let returnTicketInfo = null
    if(this.props.addReturn){
      returnTicketInfo = <DetailsTicketsReturnContainer />
    }
    return(
      <ScrollView contentContainerStyle={[common.padding40]}>
        <Text style={[common.textCenter, common.title]}> YOUR TICKETS </Text>
        <DetailsTicketsOutwardContainer />
        {returnTicketInfo}
        <AddCartButtonContainer navigation={this.props.navigation} />
      </ScrollView>
    )
  }

}
