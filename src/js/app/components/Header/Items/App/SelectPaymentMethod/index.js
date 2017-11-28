import React, { Component, PropTypes } from 'react'
import {View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Picker} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Spinner from 'react-native-spinkit'

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
    isPayment: PropTypes.bool.isRequired,
    total: PropTypes.string.isRequired
  }

  handleOnRequestClose(){
    this.props.setOpenModalPayment(!this.props.openModalPayment)
  }

  render(){
    return(
      <View>
          <Modal
            animationType='none'
            transparent={false}
            visible={this.props.openModalPayment}
            onRequestClose={() => this.handleOnRequestClose()}
            >
            <View style={common.container}>
              <ScrollView contentContainerStyle={[common.padding20, common.paddingTop40]}>
                <Text style={[common.marginTop10, common.textBold, common.textCenter]}>PAYMENT DETAILS</Text>
              {!this.props.isPayment ? <FormCreditCardContainer /> : 
                <Spinner style={common.spinner} type='Circle' isVisible={this.props.isPayment} size={100} />}
                <PayButtonContainer total={this.props.total} />
              </ScrollView>
            </View>
        </Modal>
      </View>
    )
  }
}
