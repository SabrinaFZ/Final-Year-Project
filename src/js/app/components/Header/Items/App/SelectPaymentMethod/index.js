import React, { Component, PropTypes } from 'react'
import {View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Picker} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Spinner from 'react-native-spinkit'
import { NavigationActions } from 'react-navigation'

import FormCreditCardContainer from './../../../../../containers/SelectPaymentMethod/FormCreditCard'
import PayButtonContainer from './../../../../../containers/PayButton'

import common from './../../../../../../../styles'

export default class SelectPaymentMethod extends Component {
  constructor(props){
    super(props)

    this.handleOnRequestClose = this.handleOnRequestClose.bind(this)
    this.openPaymentModal = this.openPaymentModal.bind(this)
    this.renderOpenModalPayment = this.renderOpenModalPayment.bind(this)

  }

  static propTypes = {
    openModalPayment: PropTypes.bool.isRequired,
    isPayment: PropTypes.bool.isRequired,
    total: PropTypes.string.isRequired,
    shoppingCart: PropTypes.arrayOf(PropTypes.object.isRequired),
    setOpenModalPayment: PropTypes.func.isRequired,
    setPayment: PropTypes.func.isRequired
  }

  openPaymentModal() {
    this.props.setOpenModalPayment(true)
  }

  handleOnRequestClose(){
    this.props.setOpenModalPayment(false)
  }
  
  componentDidUpdate(){
    if (this.props.shoppingCart.length == 0){
      setTimeout(() => {
        this.props.setPayment(false)
        this.handleOnRequestClose()
      }, 5000)
    }
  }

  renderOpenModalPayment(){
    if(this.props.openModalPayment){
      return (
        <Modal
          animationType="none"
          transparent={false}
          visible={this.props.openModalPayment}
          onRequestClose={() => this.handleOnRequestClose()}
        >
          <View style={common.container}>
            <ScrollView contentContainerStyle={[common.padding20, common.paddingTop40]}>
              <Text style={[common.marginTop10, common.textBold, common.textCenter]}>PAYMENT DETAILS</Text>
              {!this.props.isPayment ? <FormCreditCardContainer /> :
                <View style={[common.marginTop50, common.center]}>
                  <Spinner style={common.spinner} type='Circle' isVisible={true} size={100} />
                  <Text style={[common.marginTop10, common.textNormal]}>Payment ...</Text>
                </View>                
              }
              <PayButtonContainer total={this.props.total} />
            </ScrollView>
          </View>
        </Modal>
      )
    } else {
      return null
    }
  }

  render(){
    return(
      <View style={[common.row, common.end, common.marginTop50, common.marginBottom40]}>
        <TouchableOpacity style={common.buttonNext} onPress={() => this.openPaymentModal()} activeOpacity={0.8} >
          <Text style={common.textButtonNext}> PAY </Text>
        </TouchableOpacity>
        { this.renderOpenModalPayment() }
      </View>  
    )
  }
}
