import React, { Component, PropTypes } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import common from './../../../../../../../styles'

export default class PayButton extends Component {
  constructor(props){
    super(props)

    this.goPay = this.goPay.bind(this)
    this.setDelivery = this.setDelivery.bind(this)
    this.auth = this.auth.bind(this)
  }

  static propTypes = {
    card: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    createToken: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    setDelivery: PropTypes.func.isRequired
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.openModalPayment !== this.props.openModalPayment)
  }

  componentWillReceiveProps(newProps){
    if(newProps.card.token != this.props.card.token){
      this.auth(newProps.card.token)
    }
  }

  async goPay(){
      await this.props.createToken('https://api.mite.pay360.com/cardlock/createToken',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'publishableId': 'w_f5DyNFQsanNMHb4QP1dQ',
          'pan': this.props.card.number,
          'cvv': this.props.cvv
        })
      })
      this.setDelivery()
      this.forceUpdate()
  }

  async setDelivery(){
    await this.props.setDelivery(`https://api-southern.stage.otrl.io/orders/${this.props.orders.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic Og==',
        'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
        'x-customer-device': this.props.orders.deviceToken
      },
      body: JSON.stringify({
          "email": null,
          "delivery":{
            "deliveryMethodId":"8oiXqV0M3zDru+FCDD767d67IFo=",
            "price":0,
            "fulfilmentMethod":"00005",
            "address":null,
            "collectionLocation":"5598"
          }
        })
      })
  }

  async auth(token){
    await this.props.auth(`https://api-southern.stage.otrl.io/orders/${this.props.orders.id}/auth`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic Og==',
        'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
        'x-customer-device': this.props.orders.deviceToken
      },
      body: JSON.stringify({
        "email": this.props.card.email,
        "phone": '000000000',
        "cards":[{
          "id":"card",
          "type":"paypoint-card",
          "amount": this.props.orders.totalPrice,
          "token": token,
          "cardHolderName": this.props.card.nameholder,
          "expiryDate": `${this.props.card.expired_month}/${this.props.card.expired_year}`,
          "email": this.props.card.email,
          "phone": '000000000',
          "address":{
            "line1": this.props.card.address_line1,
            "line2":this.props.card.address_line2,
            "line3": this.props.card.address_line3,
            "town": this.props.card.city,
            "postCode": this.props.card.postcode,
            "country": this.props.card.country
          },
          "store":false,
          "nickname":null
        }],
        "storedCards":null,"vouchers":{}
      })
    })
  }

  render(){
    return(
      <View style={[common.row, common.end,  common.marginTop50, common.marginBottom40]}>
        <TouchableOpacity style={common.buttonNext} onPress={() => this.goPay()} activeOpacity={0.8}>
          <View style={[common.center, common.padding5]}>
            <Text style={common.textButtonNext}> PAY </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
