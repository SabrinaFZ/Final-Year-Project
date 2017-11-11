import React, { PropTypes, Component } from 'react'
import { ScrollView, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';
import Spinner from 'react-native-spinkit'
import { NavigationActions } from 'react-navigation'

import InfoModalContainer from './../../../../../../containers/InfoModal'

import common from './../../../../../../../../styles'

export default class SelectTicketTrainOutward extends Component {
  constructor(props){
    super(props)

    this.getTrainsName = this.getTrainsName.bind(this)
    this.getTicketType = this.getTicketType.bind(this)
    this.handleOnPressOutward =  this.handleOnPressOutward.bind(this)
    this.handleOnPressSelectOutward = this.handleOnPressSelectOutward.bind(this)
    this.handleOnPressInfo = this.handleOnPressInfo.bind(this)
  }

  static propTypes = {
    listOrigin: PropTypes.arrayOf(PropTypes.object),
    listDestination: PropTypes.arrayOf(PropTypes.object),
    originSelected: PropTypes.string.isRequired,
    destinationSelected: PropTypes.string.isRequired,
    outward: PropTypes.object.isRequired,
    addReturn: PropTypes.bool.isRequired,
    journeyPlan: PropTypes.object.isRequired,
    outwardReturn: PropTypes.string.isRequired,
    openMoreTicketsOutwardId: PropTypes.number.isRequired,
    openMoreTicketsOutward: PropTypes.bool.isRequired,
    openModalInfoOutwardId: PropTypes.number.isRequired,
    setOutwardReturn: PropTypes.func.isRequired,
    setOpenMoreTicketsOutwardId: PropTypes.func.isRequired,
    setOpenMoreTicketsOutward: PropTypes.func.isRequired,
    selectedOutward: PropTypes.func.isRequired,
    setOpenModalInfoOutward: PropTypes.func.isRequired,
    setOpenModalInfoOutwardId: PropTypes.func.isRequired,
  }

  getTrainsName(trainId){
    let station = this.props.journeyPlan.links[trainId]
    return station.name
  }

  getTrainsCRS(trainId){
    let station = this.props.journeyPlan.links[trainId]
    return station.crs
  }

  getTicketType(ticketType){
    let ticket = this.props.journeyPlan.links[ticketType]
    return ticket.name
  }

  componentWillMount(){
    this.props.setOutwardReturn('Outward')
    this.props.setOpenMoreTicketsOutward(false)
    this.props.setOpenModalInfoOutward(false)
    this.props.setOpenMoreTicketsOutwardId(0)
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.openMoreTicketsOutwardId != this.props.openMoreTicketsOutwardId){
      this.props.setOpenMoreTicketsOutward(true)
    }
  }

  getTrains(){
    var outwardJourney = []
    var outwardSingleFares = []
    var outwardReturnFares = []
    var outwardCheapestFares = []
    var journeyOutwardInfo = []
    var outwardSinglePrice = []
    var outwardReturnPrice = []

    this.props.journeyPlan.result.outward.forEach((item) => {
      outwardJourney.push(item.journey)
      outwardSingleFares.push(item.fares.singles)
      outwardCheapestFares.push(item.fares.cheapest.totalPrice)
    })

    outwardSingleFares.map((value, index) =>{
      let aux = []
      value.map((fares, i) => {
        let item = this.props.journeyPlan.links[fares]
        aux.push(item)
      })
      outwardSinglePrice.push(aux)
    })

    outwardReturnFares.map((value, index) =>{
      let aux = []
      value.map((fares, i) => {
        let item = this.props.journeyPlan.links[fares]
        aux.push(item)
      })
      outwardReturnPrice.push(aux)
    })

    outwardJourney.map((value, index) => {
      let info = {}
      let item = this.props.journeyPlan.links[value]
      info = {
        origin_station_id: this.getTrainsCRS(item.origin.station),
        destination_station_id: this.getTrainsCRS(item.destination.station),
        origin_station_name: this.getTrainsName(item.origin.station),
        destination_station_name: this.getTrainsName(item.destination.station),
        origin_time: item.origin.time.scheduledTime,
        destination_time: item.destination.time.scheduledTime,
        changes: item.changes,
        legs: item.legs,
        status: item.status,
        fares: outwardSinglePrice[index],
        cheapest: outwardCheapestFares[index],
      }
      journeyOutwardInfo.push(info)
    })

    return journeyOutwardInfo
  }

  handleOnValueChange(itemValue){
    this.props.setOutwardReturn(itemValue)
  }

  handleOnPressOutward(index){
    this.props.setOpenMoreTicketsOutwardId(index)
    if(index == this.props.openMoreTicketsOutwardId){
      this.props.setOpenMoreTicketsOutward(!this.props.openMoreTicketsOutward)
    }
  }

  handleOnPressSelectOutward(item){
    this.props.selectedOutward(item)
    if(this.props.addReturn){
      this.props.setOutwardReturn('Return')
      this.props.navigation.dispatch(
        NavigationActions.navigate({
          routeName: 'SelectTicketTrain',
          action: NavigationActions.navigate({ routeName: 'SelectTicketTrainReturn' }),
        }),
      )
    }else{
      this.props.navigation.dispatch(
        NavigationActions.navigate({
          routeName: 'SelectTicketTrain',
          action: NavigationActions.navigate({ routeName: 'DetailsTickets' }),
        }),
      )
    }
  }

  handleOnPressInfo(index){
    this.props.setOpenModalInfoOutwardId(index)
    this.props.setOpenModalInfoOutward(true)
    this.forceUpdate()
  }

  render(){
      //Return an object for outward and journey
    var trains = this.getTrains()
    var header =
      <View>
        <Text style={common.textLarge}>OUTWARD</Text>
        <View style={[common.marginTop20, common.padding10, common.backgroundColorPink, common.box]}>
          <Text style={common.textWhiteMedium}>{this.props.originSelected} - {this.props.destinationSelected}</Text>
          <Text style={common.textWhiteMedium}>Date: {this.props.outward.rangeStart.toJSON().slice(0, 10)}</Text>
        </View>
      </View>
    var info_station = trains.map((outwardItem, index) => {
      let faresOutward = null
      if(this.props.openMoreTicketsOutwardId == index && this.props.openMoreTicketsOutward){
        faresOutward = outwardItem.fares.map((fare,i) => {
          return (
            <View key={i} style={common.paddingTopBottom20}>
              <TouchableOpacity style={[common.backgroundColor, common.alignItems]}>
                <Text style={common.textBold}>{this.getTicketType(fare.ticketType)}</Text>
                <Text style={common.textNormal}>{((fare.totalPrice)/1000).toFixed(2)} £ </Text>
              </TouchableOpacity>
            </View>
          )
        })
      }
      return(
        <View key={index} style={[common.marginTop20, common.box, common.paddingTopBottom20, common.backgroundColorWhite]}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressSelectOutward(outwardItem) }>
            <View style={[common.alignItems]}>
              <Text style={common.textNormal}> {outwardItem.origin_station_id} </Text>
              <Text style={common.textBold}> {outwardItem.origin_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> {outwardItem.destination_station_id} </Text>
              <Text style={common.textBold}> {outwardItem.destination_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> Changes: {outwardItem.changes} </Text>
              <Text style={[common.marginTop20, common.textPink, common.textCenter]}> {((outwardItem.cheapest)/1000).toFixed(2)} £ </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressInfo(index)}>
            <View style={[common.marginTop20, common.separator]}>
              <Text style={[common.paddingTop20, common.textCenter, common.textBold]}> INFO </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressOutward(index)}>
            <View style={[common.marginTop20, common.separator]}>
              <Text style={[common.paddingTop20, common.textCenter, common.textBold]}> MORE TICKETS </Text>
            </View>
          </TouchableOpacity>
          {faresOutward}
        </View>
      )
    })
    return(
      <ScrollView contentContainerStyle={[common.padding40]}>
        {header}
        {info_station}
        <InfoModalContainer routeTrains={trains[this.props.openModalInfoOutwardId].legs}/>
      </ScrollView>
    )
  }
}
