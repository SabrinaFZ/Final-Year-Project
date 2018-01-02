import React, { Component, PropTypes } from 'react'
import {View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Picker, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Spinner from 'react-native-spinkit'
import { NavigationActions } from 'react-navigation'

import FormCreditCardContainer from './../../../containers/SelectPaymentMethod/FormCreditCard'
import PayButtonContainer from './../../../containers/PayButton'

import common from './../../../../..//styles'

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
    emailSent: PropTypes.bool.isRequired,
    isPaymentSuccess: PropTypes.bool.isRequired,
    total: PropTypes.string.isRequired,
    shoppingCart: PropTypes.arrayOf(PropTypes.object.isRequired),
    setOpenModalPayment: PropTypes.func.isRequired,
    setPayment: PropTypes.func.isRequired,
    isEmailSent: PropTypes.func.isRequired,
    setPaymentSuccess: PropTypes.func.isRequired
  }

  openPaymentModal() {
    this.props.setOpenModalPayment(true)
  }

  handleOnRequestClose(){
    this.props.setOpenModalPayment(false)
    if(this.props.isPaymentSuccess){
      this.props.navigation.dispatch(
        NavigationActions.reset({
          key: 'ShoppingCart',
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'DrawerScreen' }),
            NavigationActions.navigate({ routeName: 'ShoppingCart' })
          ]
        })
      )
      this.props.setPaymentSuccess(false)
    }
  }
  
  componentWillReceiveProps(newProps){
    if (newProps.shoppingCart.length == 0){
      setTimeout(() => {
        this.props.setPaymentSuccess(true)
        this.props.setPayment(false)
      }, 3000)
    }
  }

  renderOpenModalPayment(){
    let body = null
    if(this.props.openModalPayment){
      if(!this.props.isPayment && !this.props.isPaymentSuccess){
        body = 
        <View>
          <Text style={[common.marginTop10, common.textBold, common.textCenter]}>PAYMENT DETAILS</Text>
          <FormCreditCardContainer />
          <PayButtonContainer total={this.props.total} />
        </View>
      }
      if (this.props.isPayment && !this.props.isPaymentSuccess){
        body = 
        <View style={[common.marginTop50, common.center]}>
          <Spinner style={common.spinner} type='Circle' isVisible={true} size={100} />
          <Text style={[common.marginTop10, common.textNormal]}>Payment ...</Text>
        </View>  
      }
      if (!this.props.isPayment && this.props.isPaymentSuccess){
        body =
          <View style={[common.marginTop50, common.center]}>
            <Icon name='check-circle' type='FontAwesome' size={100} color='#e9418b' />
            <Text style={[common.marginTop10, common.textBold, common.textCenter]}>Success! </Text>
            <Text style={[common.textNormal, common.textCenter]}>An email with your booking information was sent, if you have any problems, please contact us</Text>
          </View>
        // Alert.alert(
        //   'SUCCESS!',
        //   'An email with your booking information was sent, if you have any problems, please contact us',
        //   [
        //     { text: 'OK', onPress: () => this.handleOnRequestClose() },
        //   ],
        //   { cancelable: false }
        // )
      }
      return (
        <Modal
          animationType="none"
          transparent={false}
          visible={this.props.openModalPayment}
          onRequestClose={() => this.handleOnRequestClose()}
        >
          <View style={common.container}>
            <ScrollView contentContainerStyle={[common.padding20, common.paddingTop40]}>
              {body}
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
