import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Icon } from 'react-native-elements'

import InfoModalContainer from './../../../../containers/InfoModal'

import common from './../../../../../../styles'

export default class ShoppingCart extends Component {
  constructor(props){
    super(props)

    this._BackAndroid = this._BackAndroid.bind(this)
    this.handleOnPressDelete = this.handleOnPressDelete.bind(this)
    this.handleOnPressInfoOutward = this.handleOnPressInfoOutward.bind(this)
    this.handleOnPressInfoReturn = this.handleOnPressInfoReturn.bind(this)
  }

  static propTypes = {
    shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
    journeyPlan: PropTypes.object.isRequired,
    addCart: PropTypes.bool.isRequired,
    openModalInfoOutward:PropTypes.bool.isRequired,
    openModalInfoReturn: PropTypes.bool.isRequired,
    openModalInfoOutwardId: PropTypes.number.isRequired,
    openModalInfoReturnId: PropTypes.number.isRequired,
    update: PropTypes.func.isRequired,
    setOpenModalInfoOutward: PropTypes.func.isRequired,
    setOpenModalInfoReturn: PropTypes.func.isRequired
  }

  componentWillMount() {
    if(this.props.addCart){
      BackHandler.addEventListener('hardwareBackPress',this._BackAndroid)
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress',this._BackAndroid)
  }

   _BackAndroid=()=>{
    return true
  }

  handleOnPressDelete(index){
    this.props.shoppingCart.splice(index,1)
    this.props.update(this.props.shoppingCart)
    this.forceUpdate()
  }

  handleOnPressInfoOutward(index){
    this.props.setOpenModalInfoOutwardId(index)
    this.props.setOpenModalInfoOutward(true)
    this.forceUpdate()
  }

  handleOnPressInfoReturn(index){
    this.props.setOpenModalInfoReturnId(index)
    this.props.setOpenModalInfoReturn(true)
    this.forceUpdate()
  }

  render(){
    let shoppingCart = null
    var modalInfo = null
    if(this.props.shoppingCart.length != 0){
      if(this.props.openModalInfoOutward){
        modalInfo = <InfoModalContainer links={this.props.shoppingCart[this.props.openModalInfoOutwardId].outward.links} routeTrains={this.props.shoppingCart[this.props.openModalInfoOutwardId].outward.legs}/>
      }
      else if(this.props.openModalInfoReturn){
        modalInfo = <InfoModalContainer links={this.props.shoppingCart[this.props.openModalInfoOutwardId].return.links} routeTrains={this.props.shoppingCart[this.props.openModalInfoReturnId].return.legs}/>
      }
      shoppingCart = this.props.shoppingCart.map((item, index) => {
        let returnInfo = null
        if(item.hasReturn){
          returnInfo =
          <View>
            <View style={[common.alignItems, common.marginTop20]}>
              <Text style={common.textPink}> RETURN </Text>
              <Text style={common.textNormal}> {item.return.origin_station_name} </Text>
              <Text style={common.textBold}> {item.return.origin_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> {item.return.destination_station_name} </Text>
              <Text style={common.textBold}> {item.return.destination_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> Changes: {item.return.changes} </Text>
              <Text style={[common.textPink]}> {((item.return.cheapest)/1000).toFixed(2)} £ </Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={[common.buttonActiveLarge, common.center, common.marginTop20]} onPress={() => this.handleOnPressInfoReturn(index)}>
                <Text style={[common.textCenter, common.textButton]}> INFO </Text>
            </TouchableOpacity>
          </View>
        }
        return(
          <View key={index} style={[common.marginTop20, common.box, common.padding10, common.backgroundColorWhite]}>
            <View style={common.alignItems}>
              <Text style={common.textPink}> OUTWARD </Text>
              <Text style={common.textNormal}> {item.outward.origin_station_name} </Text>
              <Text style={common.textBold}> {item.outward.origin_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> {item.outward.destination_station_name} </Text>
              <Text style={common.textBold}> {item.outward.destination_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> Changes: {item.outward.changes} </Text>
              <Text style={[common.textPink]}> {((item.outward.cheapest)/1000).toFixed(2)} £ </Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={[common.buttonActiveLarge, common.center, common.marginTop20]} onPress={() => this.handleOnPressInfoOutward(index)}>
                <Text style={[common.textCenter, common.textButton]}> INFO </Text>
            </TouchableOpacity>
            {returnInfo}
            <View style={[common.marginTop10, common.row, common.spaceBetween]}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressDelete(index)}>
                <View style={common.row}>
                  <Icon name='delete' type='MaterialIcons' color='#585858' />
                  <Text style={[common.padding10, common.textBold]}> DELETE </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                  <View style={common.row}>
                    <Text style={[common.padding10, common.textBold]}> PAY </Text>
                    <Icon name='credit-card' type='FontAwesome' color='#585858' />
                  </View>
              </TouchableOpacity>
            </View>
          </View>
        )
      })
    } else {
      shoppingCart =
      <View>
        <Text style={[common.textCenter, common.textPink]}>No tickets!</Text>
      </View>
    }
    return(
      <ScrollView contentContainerStyle={common.padding40}>
        {shoppingCart}
        {modalInfo}
      </ScrollView>
    )
  }
}
