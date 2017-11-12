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
  }

  static propTypes = {
    listOrigin: PropTypes.arrayOf(PropTypes.object),
    listDestination: PropTypes.arrayOf(PropTypes.object),
    originSelected: PropTypes.string.isRequired,
    destinationSelected: PropTypes.string.isRequired,
    returnBack: PropTypes.object.isRequired,
    journeyPlan: PropTypes.object.isRequired,
    outwardReturn: PropTypes.string.isRequired,
    openMoreTicketsReturnId: PropTypes.number.isRequired,
    openMoreTicketsReturn: PropTypes.bool.isRequired,
    openModalInfoReturnId: PropTypes.number.isRequired,
    openModalInfoReturn: PropTypes.bool.isRequired,
    setOutwardReturn: PropTypes.func.isRequired,
    setOpenMoreTicketsReturnId: PropTypes.func.isRequired,
    setOpenMoreTicketsReturn: PropTypes.func.isRequired,
    selectedReturn: PropTypes.func.isRequired,
    setOpenModalInfoReturn: PropTypes.func.isRequired,
    setOpenModalInfoReturnId: PropTypes.func.isRequired,
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
    this.props.setOpenModalInfoReturn(false)
    this.props.setOpenMoreTicketsReturn(false)
    this.props.setOpenMoreTicketsReturnId(0)
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.openMoreTicketsReturnId != this.props.openMoreTicketsReturnId){
      this.props.setOpenMoreTicketsReturn(true)
    }
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
      returnCheapestFares.push(item.fares.cheapest.totalPrice)
    })

    returnSingleFares.map((value, index) =>{
      let aux = []
      value.map((fares, i) => {
        let item = this.props.journeyPlan.links[fares]
        aux.push(item)
      })
      returnSinglePrice.push(aux)
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
        fares: returnSinglePrice[index],
        cheapest: returnCheapestFares[index],
        links: this.props.journeyPlan.links
      }
      journeyReturnInfo.push(info)
    })

    return journeyReturnInfo
  }

  handleOnValueChange(itemValue){
    this.props.setOutwardReturn(itemValue)
  }

  handleOnPressReturn(index){
    this.props.setOpenMoreTicketsReturnId(index)
    if(index == this.props.openMoreTicketsReturnId){
      this.props.setOpenMoreTicketsReturn(!this.props.openMoreTicketsReturn)
    }
  }

  handleOnPressSelectReturn(item){
    this.props.selectedReturn(item)
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'SelectTicketTrain',
        action: NavigationActions.navigate({ routeName: 'DetailsTickets' }),
      }),
    )
  }

  handleOnPressInfo(index){
    this.props.setOpenModalInfoReturnId(index)
    this.props.setOpenModalInfoReturn(true)
    this.forceUpdate()
  }

  render(){
      //Return an object for outward and journey
    var trains = this.getTrains()
    var modalInfo = null
    var header =
      <View>
        <Text style={common.textLarge}>RETURN</Text>
        <View style={[common.marginTop20, common.padding10, common.backgroundColorPink, common.box]}>
          <Text style={common.textWhiteMedium}>{this.props.destinationSelected} - {this.props.originSelected}</Text>
          <Text style={common.textWhiteMedium}>Date: {this.props.returnBack.rangeStart.toJSON().slice(0, 10)}</Text>
        </View>
      </View>
    var info_station = trains.map((returnItem, index) => {
      let faresReturn = null
      if(this.props.openMoreTicketsReturnId == index && this.props.openMoreTicketsReturn){
        faresReturn = returnItem.fares.map((fare,i) => {
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
      if(this.props.openModalInfoReturn){
        modalInfo = <InfoModalContainer links={returnItem.links} routeTrains={trains[this.props.openModalInfoReturnId].legs}/>
      }
      return (
        <View key={index} style={[common.marginTop20, common.box, common.paddingTopBottom20, common.backgroundColorWhite]}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressSelectReturn(returnItem) }>
            <View style={[common.alignItems]}>
              <Text style={common.textNormal}> {returnItem.origin_station_id} </Text>
              <Text style={common.textBold}> {returnItem.origin_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> {returnItem.destination_station_id} </Text>
              <Text style={common.textBold}> {returnItem.destination_time.slice(-8, -3)} </Text>
              <Text style={common.textNormal}> Changes: {returnItem.changes} </Text>
              <Text style={common.title}> {((returnItem.cheapest)/1000).toFixed(2)} £ </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressInfo(index)}>
            <View style={[common.marginTop20, common.separator]}>
              <Text style={[common.paddingTop20, common.textCenter, common.textBold]}> INFO </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleOnPressReturn(index)}>
            <View style={[common.marginTop20, common.separator]}>
              <Text style={[common.paddingTop20, common.textCenter, common.textBold]}> MORE TICKETS </Text>
            </View>
          </TouchableOpacity>
          {faresReturn}
        </View>
      )
    })
    return(
      <ScrollView contentContainerStyle={[common.padding40]}>
        {header}
        {info_station}
        {modalInfo}
      </ScrollView>
    )
  }
}
