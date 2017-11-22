import React, { PropTypes, Component } from 'react'
import { Modal, ScrollView, Platform, TextInput, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import common from './../../../../../../../styles'

import SelectAdultsContainer from './../../../../../containers/SelectPassengers/SelectAdults'
import SelectChildrenContainer from './../../../../../containers/SelectPassengers/SelectChildren'

export default class SelectPassengers extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    openPassengers: PropTypes.bool.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    openPassengersModal: PropTypes.func.isRequired,
  }

  openPassengersModal(){
    this.props.openPassengersModal(true)
  }

  handleRequestClose(){
    this.props.handleRequestClose(false)
  }

  renderOpenPassengers(){
    if(this.props.openPassengers){
      return(
        <Modal
         animationType="none"
         transparent={false}
         visible={this.props.openPassengers}
         onRequestClose={this.handleRequestClose.bind(this)}
         >
        <View style={common.container}>
          <ScrollView contentContainerStyle={common.padding40}>
            <Text style={[common.title, common.center, common.row, common.textCenter]}> {'PASSENGERS'} </Text>

            <View style={common.marginTop50}>
              {/* ADULTS */}
              <Text style={[common.textBold, common.marginTop20]}>{ 'Adults' }</Text>
              <SelectAdultsContainer />
              {/* CHILDREN */}
              <Text style={[common.textBold, common.marginTop20]}>{ 'Children' }</Text>
              <SelectChildrenContainer />
            </View>
          </ScrollView>
        </View>
      </Modal>
      )
    } else{
      return null
    }
  }

  render(){
    return(
      <View style={[common.row, common.justifyContent,  common.marginTop30]}>
        <TouchableOpacity style={[common.buttonActiveLarge]} onPress={this.openPassengersModal.bind(this)} activeOpacity={0.8}>
          <Text style={common.textButton}> {'SELECT PASSENGERS'} </Text>
        </TouchableOpacity>
        { this.renderOpenPassengers() }
      </View>
    )
  }
}
