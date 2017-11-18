import React, { Component, PropTypes } from 'react'
import {View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Picker} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import FormCreditCardContainer from './../../../../../containers/SelectPaymentMethod/FormCreditCard'
import PayButtonContainer from './../../../../../containers/PayButton'

import common from './../../../../../../../styles'

export default class SelectPaymentMethod extends Component {
  constructor(props){
    super(props)

    this.handleOnPressPaypal = this.handleOnPressPaypal.bind(this)
    this.handleOnPressCreditCard = this.handleOnPressCreditCard.bind(this)
    this.handleOnRequestClose = this.handleOnRequestClose.bind(this)

  }

  static propTypes = {
    openModalPayment: PropTypes.bool.isRequired,
    selectedPayment: PropTypes.string.isRequired,
    setSelectedPayment: PropTypes.func.isRequired
  }

  handleOnPressPaypal(){
    //Be developed later
    this.props.setSelectedPayment('paypal')
    this.forceUpdate()
  }

  handleOnPressCreditCard(){
    this.props.setSelectedPayment('credit-card')
    this.forceUpdate()
  }

  handleOnRequestClose(){
    this.props.setOpenModalPayment(!this.props.openModalPayment)
    this.props.setSelectedPayment('')
  }

  render(){
    let formPayment = null
    if(this.props.selectedPayment == 'credit-card'){
      formPayment = <FormCreditCardContainer />
    }
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
              <ScrollView contentContainerStyle={common.padding40}>
              <Text style={[common.marginTop10, common.textNormal, common.textCenter]}>SELECT YOUR PAYMENT METHOD</Text>
              <TouchableOpacity style={[common.marginTop50, common.buttonActiveLarge]} onPress={() => this.handleOnPressPaypal()} activeOpacity={0.8}>
                <View style={[common.row, common.center, common.padding5]}>
                  <Text style={common.textButton}> PAYPAL </Text>
                  <Icon name='cc-paypal' type='FontAwesome' color='#fff' size={30}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[common.marginTop50, common.buttonActiveLarge]} onPress={() => this.handleOnPressCreditCard()} activeOpacity={0.8}>
                <View style={[common.row, common.center, common.padding5]}>
                  <Text style={common.textButton}> CREDIT CARD </Text>
                  <Icon name='credit-card' type='FontAwesome' color='#fff' size={30}/>
                </View>
              </TouchableOpacity>
              {formPayment}
              <PayButtonContainer />
              </ScrollView>
            </View>
         </Modal>
        : null }
      </View>
    )
  }
}
