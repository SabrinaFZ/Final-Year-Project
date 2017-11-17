import React, { Component, PropTypes } from 'react'
import {View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Picker} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import common from './../../../../../../../styles'

export default class SelectPaymentMethod extends Component {
  constructor(props){
    super(props)

    this.handleOnPressPaypal = this.handleOnPressPaypal.bind(this)
    this.handleOnPressCreditCard = this.handleOnPressCreditCard.bind(this)
    this.handleOnRequestClose = this.handleOnRequestClose.bind(this)
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
    this.goPay = this.goPay.bind(this)
    this.setDelivery = this.setDelivery.bind(this)
    this.auth = this.auth.bind(this)

  }

  static propTypes = {
    openModalPayment: PropTypes.bool.isRequired,
    selectedPayment: PropTypes.string.isRequired,
    card: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    orders: PropTypes.object.isRequired,
    setOpenModalPayment: PropTypes.func.isRequired,
    setSelectedPayment: PropTypes.func.isRequired,
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
    console.log('paso1')
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
    console.log('token'+ token)
    console.log('paso2')
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
    let options = [
      "Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Côte d'Ivoire", "Democratic Republic of Congo", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Mali", "Mauritania", "Mexico", "Moldova", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands[L]", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Sierra Leone", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "Somaliland", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "West Sahara", "Yemen", "Zambia", "Zimbabwe"
    ]

    let countryCodes = {
      "United States" : "USA",
      "United States of America" : "USA",
      "Afghanistan": "AFG",
      "Angola": "AGO",
      "Albania": "ALB",
      "United Arab Emirates": "ARE",
      "Argentina": "ARG",
      "Armenia": "ARM",
      "Antarctica": "ATA",
      "French Southern and Antarctic Lands": "ATF",
      "Australia": "AUS",
      "Austria": "AUT",
      "Azerbaijan": "AZE",
      "Burundi": "BDI",
      "Belgium": "BEL",
      "Benin": "BEN",
      "Burkina Faso": "BFA",
      "Bangladesh": "BGD",
      "Bulgaria": "BGR",
      "The Bahamas": "BHS",
      "Bosnia and Herzegovina": "BIH",
      "Belarus": "BLR",
      "Belize": "BLZ",
      "Bolivia": "BOL",
      "Brazil": "BRA",
      "Brunei": "BRN",
      "Bhutan": "BTN",
      "Botswana": "BWA",
      "Central African Republic": "CAF",
      "Canada": "CAN",
      "Switzerland": "CHE",
      "Chile": "CHL",
      "China": "CHN",
      "Ivory Coast": "CIV",
      "Cameroon": "CMR",
      "Democratic Republic of the Congo": "COD",
      "Republic of the Congo": "COG",
      "Colombia": "COL",
      "Tanzania" : "TZA",
      "Costa Rica": "CRI",
      "Cuba": "CUB",
      "Northern Cyprus": "-99",
      "Cyprus": "CYP",
      "Czech Republic": "CZE",
      "Germany": "DEU",
      "Djibouti": "DJI",
      "Denmark": "DNK",
      "Dominican Republic": "DOM",
      "Algeria": "DZA",
      "Ecuador": "ECU",
      "Egypt": "EGY",
      "Eritrea": "ERI",
      "Spain": "ESP",
      "Estonia": "EST",
      "Ethiopia": "ETH",
      "Finland": "FIN",
      "Fiji": "FJI",
      "Falkland Islands": "FLK",
      "France": "FRA",
      "Gabon": "GAB",
      "United Kingdom": "GBR",
      "Georgia": "GEO",
      "Ghana": "GHA",
      "Guinea": "GIN",
      "Gambia": "GMB",
      "Guinea Bissau": "GNB",
      "Equatorial Guinea": "GNQ",
      "Greece": "GRC",
      "Greenland": "GRL",
      "Guatemala": "GTM",
      "Guyana": "GUY",
      "Honduras": "HND",
      "Croatia": "HRV",
      "Haiti": "HTI",
      "Hungary": "HUN",
      "Indonesia": "IDN",
      "India": "IND",
      "Ireland": "IRL",
      "Iran": "IRN",
      "Iraq": "IRQ",
      "Iceland": "ISL",
      "Israel": "ISR",
      "Italy": "ITA",
      "Jamaica": "JAM",
      "Jordan": "JOR",
      "Japan": "JPN",
      "Kazakhstan": "KAZ",
      "Kenya": "KEN",
      "Kyrgyzstan": "KGZ",
      "Cambodia": "KHM",
      "South Korea": "KOR",
      "Kosovo": "-99",
      "Kuwait": "KWT",
      "Laos": "LAO",
      "Lebanon": "LBN",
      "Liberia": "LBR",
      "Libya": "LBY",
      "Sri Lanka": "LKA",
      "Lesotho": "LSO",
      "Lithuania": "LTU",
      "Luxembourg": "LUX",
      "Latvia": "LVA",
      "Morocco": "MAR",
      "Moldova": "MDA",
      "Madagascar": "MDG",
      "Mexico": "MEX",
      "Macedonia": "MKD",
      "Mali": "MLI",
      "Myanmar": "MMR",
      "Montenegro": "MNE",
      "Mongolia": "MNG",
      "Mozambique": "MOZ",
      "Mauritania": "MRT",
      "Malawi": "MWI",
      "Malaysia": "MYS",
      "Namibia": "NAM",
      "New Caledonia": "NCL",
      "Niger": "NER",
      "Nigeria": "NGA",
      "Nicaragua": "NIC",
      "Netherlands": "NLD",
      "Norway": "NOR",
      "Nepal": "NPL",
      "New Zealand": "NZL",
      "Oman": "OMN",
      "Pakistan": "PAK",
      "Panama": "PAN",
      "Peru": "PER",
      "Philippines": "PHL",
      "Papua New Guinea": "PNG",
      "Guinea": "PNG",
      "Poland": "POL",
      "Puerto Rico": "PRI",
      "North Korea": "PRK",
      "Portugal": "PRT",
      "Paraguay": "PRY",
      "Qatar": "QAT",
      "Romania": "ROU",
      "Russia": "RUS",
      "Soviet Union":"RUS",
      "Rwanda": "RWA",
      "Western Sahara": "-99",
      "Saudi Arabia": "SAU",
      "Sudan": "SDN",
      "South Sudan": "SDS",
      "Senegal": "SEN",
      "Solomon Islands": "SLB",
      "Sierra Leone": "SLE",
      "El Salvador": "SLV",
      "Somaliland": "-99",
      "Somalia": "SOM",
      "Republic of Serbia": "SRB",
      "Suriname": "SUR",
      "Slovakia": "SVK",
      "Slovenia": "SVN",
      "Sweden": "SWE",
      "Swaziland": "SWZ",
      "Syria": "SYR",
      "Chad": "TCD",
      "Togo": "TGO",
      "Thailand": "THA",
      "Tajikistan": "TJK",
      "Turkmenistan": "TKM",
      "East Timor": "TLS",
      "Monaco" : "MCO",
      "Trinidad and Tobago": "TTO",
      "Tunisia": "TUN",
      "Turkey": "TUR",
      "Taiwan": "TWN",
      "United Republic of Tanzania": "TZA",
      "Uganda": "UGA",
      "Ukraine": "UKR",
      "Uruguay": "URY",
      "United States of America": "USA",
      "Uzbekistan": "UZB",
      "Venezuela": "VEN",
      "Vietnam": "VNM",
      "Vanuatu": "VUT",
      "West Bank": "PSE",
      "Yemen": "YEM",
      "South Africa": "ZAF",
      "Zambia": "ZMB",
      "Zimbabwe": "ZWE",
      "Crimea" : "UKR",
      "Serbia" : "SRB",
      "French Guiana": "GUF",
      "Scotland" : "GBR",
      "Wales" : "GBR",
      "The Netherlands": "NLD",
      "England" : "GBR",
      "Northern Ireland" : "IRL"
      }

    let formPayment = null
    if(this.props.selectedPayment == 'credit-card'){
      formPayment =
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
              <TouchableOpacity style={[common.marginTop50, common.buttonActiveLarge]} onPress={() => this.goPay()} activeOpacity={0.8}>
                <View style={[common.center, common.padding5]}>
                  <Text style={common.textButton}> PAY </Text>
                </View>
              </TouchableOpacity>
              </ScrollView>
            </View>
         </Modal>
        : null }
      </View>
    )
  }
}
