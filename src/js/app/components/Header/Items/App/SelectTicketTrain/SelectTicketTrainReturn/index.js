import React, { PropTypes, Component } from 'react'
import { ScrollView, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';
import Spinner from 'react-native-spinkit'
import { NavigationActions } from 'react-navigation'

import InfoModalContainer from './../../../../../../containers/InfoModal'

import common from './../../../../../../../../styles'

export default class SelectTicketTrainReturn extends Component {
  constructor(props){
    super(props)

    this.getTrainsName = this.getTrainsName.bind(this)
    this.getTicketType = this.getTicketType.bind(this)
    this.handleOnPressReturn =  this.handleOnPressReturn.bind(this)
    this.handleOnPressSelectReturn = this.handleOnPressSelectReturn.bind(this)
    this.handleOnPressInfo = this.handleOnPressInfo.bind(this)
    this.handleOnPressInfoOutward = this.handleOnPressInfoOutward.bind(this)
    this.handleOnPressSelectFare = this.handleOnPressSelectFare.bind(this)
    this.goNext = this.goNext.bind(this)
  }

  static propTypes = {
    listOrigin: PropTypes.arrayOf(PropTypes.object),
    listDestination: PropTypes.arrayOf(PropTypes.object),
    originSelected: PropTypes.string.isRequired,
    destinationSelected: PropTypes.string.isRequired,
    outward: PropTypes.object.isRequired,
    returnBack: PropTypes.object.isRequired,
    journeyPlan: PropTypes.object.isRequired,
    outwardReturn: PropTypes.string.isRequired,
    openMoreTicketsReturnId: PropTypes.number.isRequired,
    openMoreTicketsReturn: PropTypes.bool.isRequired,
    openModalInfoReturnId: PropTypes.number.isRequired,
    openModalInfoReturn: PropTypes.bool.isRequired,
    openModalInfoOutward: PropTypes.bool.isRequired,
    openModalInfoOutwardId: PropTypes.number.isRequired,
    openMoreTicketsOutwardId: PropTypes.number.isRequired,
    openMoreTicketsOutward: PropTypes.bool.isRequired,
    setOutwardReturn: PropTypes.func.isRequired,
    setOpenMoreTicketsReturnId: PropTypes.func.isRequired,
    setOpenMoreTicketsReturn: PropTypes.func.isRequired,
    selectedReturn: PropTypes.func.isRequired,
    setOpenModalInfoReturn: PropTypes.func.isRequired,
    setOpenModalInfoReturnId: PropTypes.func.isRequired,
    selectedOutward: PropTypes.func.isRequired,
    setOpenModalInfoOutward: PropTypes.func.isRequired,
    setOpenModalInfoOutwardId: PropTypes.func.isRequired,
    setOpenMoreTicketsOutwardId: PropTypes.func.isRequired,
    setOpenMoreTicketsOutward: PropTypes.func.isRequired,
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
    this.props.setOpenModalInfoOutward(false)
    this.props.setOpenModalInfoReturn(false)
    this.props.setOpenMoreTicketsReturn(false)
    this.props.setOpenMoreTicketsReturnId(0)
    this.props.setOpenMoreTicketsOutward(false)
    this.props.setOpenMoreTicketsOutwardId(0)
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.openMoreTicketsReturnId != this.props.openMoreTicketsReturnId){
      this.props.setOpenMoreTicketsReturn(true)
    }
  }

  getTrainsOutward(){
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
      outwardCheapestFares.push(item.fares.cheapest.outwardSingle)
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
        fares: outwardSingleFares[index],
        cheapest: outwardCheapestFares[index],
        selectedFare: outwardCheapestFares[index],
        links: this.props.journeyPlan.links
      }
      journeyOutwardInfo.push(info)
    })

    return journeyOutwardInfo
  }

  getTrains(){
    var returnJourney = []
    var returnSingleFares = []
    var returnReturnFares = []
    var returnCheapestFares = []
    var journeyReturnInfo = []
    var returnSinglePrice = []
    var returnReturnPrice = []

    this.props.journeyPlan.result.return.forEach((item) => {
      returnJourney.push(item.journey)
      returnSingleFares.push(item.fares.singles)
      returnCheapestFares.push(item.fares.cheapest.outwardSingle)
    })

    returnJourney.map((value, index) => {
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
        fares: returnSingleFares[index],
        cheapest: returnCheapestFares[index],
        selectedFare: returnCheapestFares[index],
        links: this.props.journeyPlan.links
      }
      journeyReturnInfo.push(info)
    })

    return journeyReturnInfo
  }

  handleOnValueChange(itemValue){
    this.props.setOutwardReturn(itemValue)
  }

  handleOnPressReturn(index, index1){
    this.props.setOpenMoreTicketsReturnId(index)
    this.props.setOpenMoreTicketsOutwardId(index1)
    if(index == this.props.openMoreTicketsReturnId && index1 == this.props.openMoreTicketsOutwardId ){
      this.props.setOpenMoreTicketsReturn(!this.props.openMoreTicketsReturn)
    }
  }

  handleOnPressSelectReturn(outwardItem, returnItem){
    this.props.selectedOutward(outwardItem)
    this.props.selectedReturn(returnItem)
    this.goNext()
  }

  handleOnPressInfo(index){
    this.props.setOpenModalInfoReturnId(index)
    this.props.setOpenModalInfoReturn(true)
    this.forceUpdate()
  }

  handleOnPressInfoOutward(index){
    this.props.setOpenModalInfoOutwardId(index)
    this.props.setOpenModalInfoOutward(true)
    this.forceUpdate()
  }

  handleOnPressSelectFare(item, outwardItem, fare){
    item.selectedFare = fare
    this.props.selectedOutward(outwardItem)
    this.props.selectedReturn(item)
    this.goNext()
  }

  goNext(){
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'SelectTicketTrain',
        action: NavigationActions.navigate({ routeName: 'DetailsTickets' }),
      }),
    )
  }

  render(){
      //Return an object for outward and journey
    var trains = this.getTrains()
    var trainsOutward = this.getTrainsOutward()
    var modalInfo = null
    var header =
      <View>
        <View style={common.center}>
          <Text style={common.textLarge}>SELECT YOUR TICKET</Text>
        </View>
        <View style={[common.marginTop20, common.padding10, common.backgroundColorPink, common.box]}>
          <Text style={common.textWhiteSmall}>{this.props.originSelected} - {this.props.destinationSelected}</Text>
          <Text style={common.textWhiteSmall}>Date: {this.props.outward.rangeStart.toJSON().slice(0, 10)} / {this.props.returnBack.rangeStart.toJSON().slice(0, 10)}</Text>
        </View>
      </View>

    var info_station = trainsOutward.map((outwardItem, index1) => {
      let info = null
      if(this.props.openModalInfoOutward){
        modalInfo = <InfoModalContainer links={trainsOutward[this.props.openModalInfoOutwardId].links} routeTrains={trainsOutward[this.props.openModalInfoOutwardId].legs}/>
      }
      if(this.props.openModalInfoReturn){
        modalInfo = <InfoModalContainer links={trains[this.props.openModalInfoReturnId].links} routeTrains={trains[this.props.openModalInfoReturnId].legs}/>
      }

      info =
      <View key={index1}>
        {
          trains.map((returnItem, index) => {
            let faresReturn = null
            if(this.props.openMoreTicketsReturnId == index && this.props.openMoreTicketsOutwardId == index1 &&  this.props.openMoreTicketsReturn){
              faresReturn = returnItem.fares.map((fare,i) => {
                return (
                  <View key={i} style={common.paddingTopBottom20}>
                    <TouchableOpacity activeOpacity={0.8} style={[common.backgroundColor, common.paddingLeftRight20, common.alignItems]} onPress={()=> this.handleOnPressSelectFare(returnItem, outwardItem, fare)}>
                      <Text style={common.textBold}>{this.getTicketType(this.props.journeyPlan.links[fare].ticketType)}</Text>
                      <Text style={common.textNormal}>{((this.props.journeyPlan.links[fare].totalPrice)/1000).toFixed(2)} £ </Text>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
            return <View key={index} style={[common.marginTop20, common.box, common.paddingTopBottom20, common.backgroundColorWhite]}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressSelectReturn(outwardItem, returnItem) }>
              <View style={[common.row, common.spaceBetween, common.paddingLeftRight20]}>
                <View style={common.alignItems}>
                  <Text style={common.textPink}> OUTWARD </Text>
                  <Text style={common.textNormal}> {outwardItem.origin_station_id} </Text>
                  <Text style={common.textBold}> {outwardItem.origin_time.slice(-8, -3)} </Text>
                  <Text style={common.textNormal}> {outwardItem.destination_station_id} </Text>
                  <Text style={common.textBold}> {outwardItem.destination_time.slice(-8, -3)} </Text>
                  <Text style={common.textNormal}> Changes: {outwardItem.changes} </Text>
                </View>
                <View style={common.alignItems}>
                  <Text style={common.textPink}> RETURN </Text>
                  <Text style={common.textNormal}> {returnItem.origin_station_id} </Text>
                  <Text style={common.textBold}> {returnItem.origin_time.slice(-8, -3)} </Text>
                  <Text style={common.textNormal}> {returnItem.destination_station_id} </Text>
                  <Text style={common.textBold}> {returnItem.destination_time.slice(-8, -3)} </Text>
                  <Text style={common.textNormal}> Changes: {returnItem.changes} </Text>
                </View>
                </View>
                <View style={common.center}>
                  <Text style={common.title}> {((this.props.journeyPlan.links[returnItem.selectedFare].totalPrice)/1000).toFixed(2)} £ </Text>
                </View>
              </TouchableOpacity>
              <View style={[common.marginTop20, common.row, common.spaceBetween, common.separator, common.paddingLeftRight20]}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressInfoOutward(index1)} style={[common.paddingTopBottom20,, common.alignItems]}>
                  <Text style={common.textBold}> INFO </Text>
                  <Text style={common.textBold}> OUTWARD </Text>
                </TouchableOpacity>
                <View style={common.separatorRight}>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressInfo(index)} style={[common.paddingTopBottom20, common.alignItems]}>
                  <Text style={common.textBold}> INFO </Text>
                  <Text style={common.textBold}> RETURN </Text>
                </TouchableOpacity>
              </View>
              <View style={common.separator}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressReturn(index, index1)} style={[common.paddingTop20, common.alignItems]}>
                  <Text style={common.textBold}> MORE TICKETS </Text>
                </TouchableOpacity>
                {faresReturn}
              </View>
            </View>
          })
        }
      </View>
      return info
    })

    return(
      <ScrollView contentContainerStyle={[common.padding20, common.paddingTop40]}>
        {header}
        {info_station}
        {modalInfo}
      </ScrollView>
    )
  }
}
