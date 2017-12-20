import React, { Component, PropTypes } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import common from './../../../../../styles'

export default class PayButton extends Component {
  constructor(props){
    super(props)

    this.goPay = this.goPay.bind(this)
  }

  static propTypes = {
    card: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    total: PropTypes.string.isRequired,
    isPayment: PropTypes.bool.isRequired,
    isPaymentSuccess: PropTypes.bool.isRequired,
    auth: PropTypes.func.isRequired
  }

  async goPay(){
    await this.props.auth('http://sabrina-tfg.herokuapp.com/api/payment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": this.props.orders.id,
        "amount": this.props.total,
        "cardHolderName": this.props.card.nameholder,
        "expiryDate": `${this.props.card.expired_month}/${this.props.card.expired_year}`,
        "email": this.props.card.email,
        "cvv": this.props.card.cvv,
        "number": this.props.card.number,
        "address": {
          "line1": this.props.card.address_line1,
          "line2": this.props.card.address_line2,
          "line3": this.props.card.address_line3,
          "town": this.props.card.city,
          "postCode": this.props.card.postcode,
          "country": this.props.card.country
        },
        "orders": this.props.orders
      })
    })
  }
  
  render(){
    return(
      <View style={[common.row, common.end,  common.marginTop50, common.marginBottom40]}>
        {!this.props.isPayment ? <TouchableOpacity style={common.buttonNext} onPress={() => this.goPay()} activeOpacity={0.8}>
          <View style={common.center}>
            <Text style={common.textButtonNext}> PAY </Text>
          </View>
        </TouchableOpacity>
        : null }
      </View>
    )
  }
}
