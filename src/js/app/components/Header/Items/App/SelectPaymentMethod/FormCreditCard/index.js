import React, { Component, PropTypes } from 'react'
import {View, Text, TouchableOpacity, TextInput, Picker} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import options from './country'
import countryCodes from './countryCodes'

import common from './../../../../../../../../styles'

export default class FormCreditCard extends Component {
  constructor(props){
    super(props)

    this.handleValueExpiryMonthChange = this.handleValueExpiryMonthChange.bind(this)
    this.handleValueExpiryYearChange = this.handleValueExpiryYearChange.bind(this)
    this.handleValueCountryChange = this.handleValueCountryChange.bind(this)
    this.onChangeCVV = this.onChangeCVV.bind(this)
    this.onChangeCity = this.onChangeCity.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangeCardHolderName = this.onChangeCardHolderName.bind(this)
    this.onChangeNumber = this.onChangeNumber.bind(this)
    this.onChangePostcode = this.onChangePostcode.bind(this)
    this.onVerifyEmail = this.onVerifyEmail.bind(this)
  }

  static propTypes = {
    card: PropTypes.object.isRequired,
    setChangeCVV: PropTypes.func.isRequired,
    setChangeCity: PropTypes.func.isRequired,
    setChangeEmail: PropTypes.func.isRequired,
    setChangeNumber: PropTypes.func.isRequired,
    setChangeCountry: PropTypes.func.isRequired,
    setChangePostcode: PropTypes.func.isRequired,
    setChangeExpiredYear: PropTypes.func.isRequired,
    setChangeAddressLine1: PropTypes.func.isRequired,
    setChangeAddressLine2: PropTypes.func.isRequired,
    setChangeAddressLine3: PropTypes.func.isRequired,
    setChangeExpiredMonth: PropTypes.func.isRequired,
    setChangeCardHolderName: PropTypes.func.isRequired,
  }

  // componentDidMount(){
  //   this.props.setChangeCountry(0)
  //   this.props.setChangeExpiredMonth(0)
  //   this.props.setChangeExpiredYear(0)
  // }

  onChangeCardHolderName(text){
    this.props.setChangeCardHolderName(text)
  }

  onChangeCVV(text){
    this.props.setChangeCVV(text)
  }

  onChangeCity(text){
    this.props.setChangeCity(text)
  }

  onChangeEmail(text){
    this.props.setChangeEmail(text)
  }

  onChangeNumber(text){
    this.props.setChangeNumber(text)
  }

  onChangePostcode(text){
    this.props.setChangePostcode(text)
  }

  onChangeAddressLine1(text){
    this.props.setChangeAddressLine1(text)
  }

  onChangeAddressLine2(text){
    this.props.setChangeAddressLine2(text)
  }

  onChangeAddressLine3(text){
    this.props.setChangeAddressLine3(text)
  }

  onVerifyEmail(text){
    if (text === this.props.card.email){
      //Be developed later
    }
  }

  handleValueExpiryMonthChange(item){
    if(item != 0){
      this.props.setChangeExpiredMonth(item)
      this.forceUpdate()
    }
  }

  handleValueExpiryYearChange(item){
    if(item != 0){
      this.props.setChangeExpiredYear(item)
      this.forceUpdate()
    }
  }

  handleValueCountryChange(item){
    if(item != 0){
      this.props.setChangeCountry(item)
      this.forceUpdate()
    }
  }

  render(){
    return(
      <View style={[common.marginTop50, common.box, common.padding10]}>
        <Text style={common.textBold}>Card Details</Text>
        <TextInput
          placeholder='Cardholder name'
          onChangeText={(text) => this.onChangeCardHolderName(text)}
          underlineColorAndroid='#e9418b'
        />
        <TextInput
          keyboardType='numeric'
          maxLength={19}
          placeholder='Card number'
          onChangeText={(text) => this.onChangeNumber(text)}
          underlineColorAndroid='#e9418b'
        />
        <View style={common.box}>
          <Picker
            selectedValue={this.props.card.expired_month}
            onValueChange={(itemValue, itemIndex) => this.handleValueExpiryMonthChange(itemValue, itemIndex)}>
            <Picker.Item value='0' label='Expiry Month' />
            <Picker.Item value='01' label='01' />
            <Picker.Item value='02' label='02' />
            <Picker.Item value='03' label='03' />
            <Picker.Item value='04' label='04' />
            <Picker.Item value='05' label='05' />
            <Picker.Item value='06' label='06' />
            <Picker.Item value='07' label='07' />
            <Picker.Item value='09' label='09' />
            <Picker.Item value='10' label='10' />
            <Picker.Item value='11' label='11' />
            <Picker.Item value='12' label='12' />
          </Picker>
          <Picker
            selectedValue={this.props.card.expired_year}
            onValueChange={(itemValue, itemIndex) => this.handleValueExpiryYearChange(itemValue, itemIndex)}>
            <Picker.Item value='0' label='Expiry Year' />
            <Picker.Item value='2018' label='2018' />
            <Picker.Item value='2019' label='2019' />
            <Picker.Item value='2020' label='2020' />
            <Picker.Item value='2021' label='2021' />
            <Picker.Item value='2022' label='2022' />
            <Picker.Item value='2023' label='2023' />
            <Picker.Item value='2024' label='2024' />
            <Picker.Item value='2025' label='2025' />
            <Picker.Item value='2026' label='2026' />
            <Picker.Item value='2027' label='2027' />
            <Picker.Item value='2028' label='2028' />
          </Picker>
        </View>
        <TextInput
          keyboardType='numeric'
          maxLength={4}
          placeholder='CVV'
          onChangeText={(text) => this.onChangeCVV(text)}
          underlineColorAndroid='#e9418b'
        />
        <Text style={common.textBold}>Billing Address</Text>
        <TextInput
          placeholder='Address Line 1'
          onChangeText={(text) => this.onChangeAddressLine1(text)}
          underlineColorAndroid='#e9418b'
        />
        <TextInput
          placeholder='Address Line 2'
          onChangeText={(text) => this.onChangeAddressLine2(text)}
          underlineColorAndroid='#e9418b'
        />
        <TextInput
          placeholder='Address Line 3'
          onChangeText={(text) => this.onChangeAddressLine3(text)}
          underlineColorAndroid='#e9418b'
        />
        <TextInput
          placeholder='Town/City'
          onChangeText={(text) => this.onChangeCity(text)}
          underlineColorAndroid='#e9418b'
        />
        <TextInput
          placeholder='Postcode'
          onChangeText={(text) => this.onChangePostcode(text)}
          underlineColorAndroid='#e9418b'
        />
        <Picker
          selectedValue={this.props.card.country}
          onValueChange={(itemValue, itemIndex) => this.handleValueCountryChange(itemValue, itemIndex)}>
          <Picker.Item value='0' label='Select Country' />
          {options.map((item, index)=>{
            return <Picker.Item key={index} value={countryCodes[item]} label={item} />
          })}
        </Picker>
        <Text style={common.textBold}>Contact Details</Text>
        <TextInput
          keyboardType='email-address'
          placeholder='Email Address'
          onChangeText={(text) => this.onChangeEmail(text)}
          underlineColorAndroid='#e9418b'
        />
      </View>
    )
  }
}
