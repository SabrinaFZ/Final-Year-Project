import React, { Component, PropTypes } from 'react'
import {View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Picker} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import FormCreditCardContainer from './../../../../../containers/SelectPaymentMethod/FormCreditCard'
import PayButtonContainer from './../../../../../containers/PayButton'

import common from './../../../../../../../styles'

export default class SelectPaymentMethod extends Component {
  constructor(props){
    super(props)

    this.handleOnRequestClose = this.handleOnRequestClose.bind(this)

  }

  static propTypes = {
    openModalPayment: PropTypes.bool.isRequired,
    total: PropTypes.string.isRequired
  }

  handleOnRequestClose(){
    this.props.setOpenModalPayment(!this.props.openModalPayment)
  }

  render(){
    return(
      <View>
        {this.props.openModalPayment ?
          <Modal
            animationType='none'
            transparent={false}
            visible={this.props.openModalPayment}
            onRequestClose={() => this.handleOnRequestClose()}
            >
            <View style={common.container}>
              <ScrollView contentContainerStyle={[common.padding20, common.paddingTop40]}>
                <Text style={[common.marginTop10, common.textBold, common.textCenter]}>PAYMENT DETAILS</Text>
                <FormCreditCardContainer />
                <PayButtonContainer total={this.props.total} />
              </ScrollView>
            </View>
        </Modal>
        : null }
      </View>
    )
  }
}
