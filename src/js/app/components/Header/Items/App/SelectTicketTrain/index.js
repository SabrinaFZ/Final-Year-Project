import React, { PropTypes, Component } from 'react'
import { ScrollView, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';
import Spinner from 'react-native-spinkit'
import { NavigationActions } from 'react-navigation'

import ErrorModalContainer from './../../../../../containers/ErrorModal'
import InfoModalContainer from './../../../../../containers/SelectTicketTrain/InfoModal'

import common from './../../../../../../../styles'

export default class SelectTicketTrain extends Component {
  constructor(props){
    super(props)

    this.getTrainsName = this.getTrainsName.bind(this)
    this.getTicketType = this.getTicketType.bind(this)
    this.handleOnPressOutward =  this.handleOnPressOutward.bind(this)
    this.handleOnPressReturn =  this.handleOnPressReturn.bind(this)
    this.handleOnPressSelectOutward = this.handleOnPressSelectOutward.bind(this)
    this.handleOnPressSelectReturn = this.handleOnPressSelectReturn.bind(this)
    this.handleOnPressInfo = this.handleOnPressInfo.bind(this)
  }

  static propTypes = {
    listOrigin: PropTypes.arrayOf(PropTypes.object),
    listDestination: PropTypes.arrayOf(PropTypes.object),
    originSelected: PropTypes.string.isRequired,
    destinationSelected: PropTypes.string.isRequired,
    outward: PropTypes.object.isRequired,
    returnBack: PropTypes.object.isRequired,
    adults: PropTypes.number.isRequired,
    childrenNumber: PropTypes.number.isRequired,
    addReturn: PropTypes.bool.isRequired,
    journeyPlan: PropTypes.object.isRequired,
    loadingTrains: PropTypes.bool.isRequired,
    outwardReturn: PropTypes.string.isRequired,
    openMoreTicketsOutwardId: PropTypes.number.isRequired,
    openMoreTicketsOutward: PropTypes.bool.isRequired,
    openMoreTicketsReturnId: PropTypes.number.isRequired,
    openMoreTicketsReturn: PropTypes.bool.isRequired,
    openModalInfoOutwardId: PropTypes.number.isRequired,
    isLoadingTrains: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    post: PropTypes.func.isRequired,
    setOutwardReturn: PropTypes.func.isRequired,
    setOpenMoreTicketsOutwardId: PropTypes.func.isRequired,
    setOpenMoreTicketsOutward: PropTypes.func.isRequired,
    setOpenMoreTicketsReturnId: PropTypes.func.isRequired,
    setOpenMoreTicketsReturn: PropTypes.func.isRequired,
    selectedOutward: PropTypes.func.isRequired,
    selectedReturn: PropTypes.func.isRequired,
    setOpenModalInfoOutward: PropTypes.func.isRequired,
    setOpenModalInfoOutwardId: PropTypes.func.isRequired,
  }

  async findTicketTrains() {
    let { originId, destinationId } = this.getTrainsId()
    if(this.props.addReturn){
      await this.props.post('https://api-southern.stage.otrl.io/jp/journey-plan',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
          'Authorization': 'Basic Og=='
        },
        body: JSON.stringify({
          origin: originId,
          destination: destinationId,
          outward:	{
            rangeStart:this.props.outward.rangeStart.toJSON().slice(0, -5),
            rangeEnd:this.props.outward.rangeEnd.toJSON().slice(0, -5),
            arriveDepart:this.props.outward.arriveDepart,
          },
          openReturn:false,
          adults: this.props.adults,
          children: this.props.childrenNumber,
          disableGroupSavings: true,
          showCheapest: false,
          doRealTime: false,
          return:	{
            rangeStart:this.props.returnBack.rangeStart.toJSON().slice(0, -5),
            rangeEnd:this.props.returnBack.rangeEnd.toJSON().slice(0, -5),
            arriveDepart:this.props.returnBack.arriveDepart,
          }
        })
      })
    } else{
      await this.props.post('https://api-southern.stage.otrl.io/jp/journey-plan',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
          'Authorization': 'Basic Og=='
        },
        body: JSON.stringify({
          origin: originId,
          destination: destinationId,
          outward:	{
            rangeStart:this.props.outward.rangeStart.toJSON().slice(0, -5),
            rangeEnd:this.props.outward.rangeEnd.toJSON().slice(0, -5),
            arriveDepart:this.props.outward.arriveDepart,
          },
          openReturn:false,
          adults: this.props.adults,
          children: this.props.childrenNumber,
          disableGroupSavings: true,
          showCheapest: false,
          doRealTime: false,
        })
      })
    }
  }

  getTrainsId(){
    var originId = null
    var destinationId =  null
    this.props.listOrigin.forEach((item) => {
      if(item.name ==  this.props.originSelected){
        originId = item.nlc
      }
    })
    this.props.listDestination.forEach((item) => {
      if(item.name ==  this.props.destinationSelected){
        destinationId = item.nlc
      }
    })
    return { originId, destinationId }
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
    this.props.setOpenMoreTicketsOutwardId(0)
    this.findTicketTrains()
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.openMoreTicketsOutwardId != this.props.openMoreTicketsOutwardId){
      this.props.setOpenMoreTicketsOutward(true)
    }
    if(nextProps.openMoreTicketsReturnId != this.props.openMoreTicketsReturnId){
      this.props.setOpenMoreTicketsReturn(true)
    }
  }

  getTrains(){
    var outwardJourney = []
    var returnJourney = []
    var outwardSingleFares = []
    var outwardReturnFares = []
    var outwardCheapestFares = []
    var returnSingleFares = []
    var returnReturnFares = []
    var returnCheapestFares = []
    var journeyOutwardInfo = []
    var journeyReturnInfo = []
    var outwardSinglePrice = []
    var outwardReturnPrice = []
    var returnSinglePrice = []
    var returnReturnPrice = []

    this.props.journeyPlan.result.outward.forEach((item) => {
      outwardJourney.push(item.journey)
      outwardSingleFares.push(item.fares.singles)
      outwardCheapestFares.push(item.fares.cheapest.totalPrice)
    })
    this.props.journeyPlan.result.return.forEach((item) => {
      returnJourney.push(item.journey)
      returnSingleFares.push(item.fares.singles)
      returnCheapestFares.push(item.fares.cheapest.totalPrice)
    })

    outwardSingleFares.map((value, index) =>{
      let aux = []
      value.map((fares, i) => {
        let item = this.props.journeyPlan.links[fares]
        aux.push(item)
      })
      outwardSinglePrice.push(aux)
    })

    returnSingleFares.map((value, index) =>{
      let aux = []
      value.map((fares, i) => {
        let item = this.props.journeyPlan.links[fares]
        aux.push(item)
      })
      returnSinglePrice.push(aux)
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
      }
      journeyReturnInfo.push(info)
    })

    return { journeyOutwardInfo, journeyReturnInfo }
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

  handleOnPressReturn(index){
    this.props.setOpenMoreTicketsReturnId(index)
    if(index == this.props.openMoreTicketsReturnId){
      this.props.setOpenMoreTicketsReturn(!this.props.openMoreTicketsReturn)
    }
  }

  handleOnPressSelectOutward(item){
    this.props.selectedOutward(item)
    if(this.props.addReturn){
      this.props.setOutwardReturn('Return')
    }else{
      this.props.navigation.dispatch(
        NavigationActions.navigate({
          routeName: 'SelectTicketTrain',
          action: NavigationActions.navigate({ routeName: 'DetailsTickets' }),
        }),
      )
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
    this.props.setOpenModalInfoOutwardId(index)
    this.props.setOpenModalInfoOutward(true)
    this.forceUpdate()
  }

  render(){
    if(!this.props.loadingTrains && this.props.error==false){
      //Return an object for outward and journey
      var trains = this.getTrains()
      var picker;
      if(this.props.addReturn){
        picker =
        <Picker
          selectedValue={this.props.outwardReturn}
          onValueChange={(itemValue) => this.handleOnValueChange(itemValue)}>
          <Picker.Item value='Outward' label='Select Outward' />
          <Picker.Item value='Return' label='Select Return' />
        </Picker>
      }else{
        picker =
        <Picker
          selectedValue={this.props.outwardReturn}
          onValueChange={(itemValue) => this.handleOnValueChange(itemValue)}>
          <Picker.Item value='Outward' label='Select Outward' />
        </Picker>
      }
      if(this.props.outwardReturn == 'Outward'){
        var info_station = trains.journeyOutwardInfo.map((outwardItem, index) => {
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
      }
      else{
        var info_station = trains.journeyReturnInfo.map((returnItem, index) => {
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
              <TouchableOpacity activeOpacity={0.8} >
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
      }
      return(
        <ScrollView contentContainerStyle={[common.padding40]}>
          {picker}
          {info_station}
          <InfoModalContainer routeTrains={trains.journeyOutwardInfo[this.props.openModalInfoOutwardId].legs}/>
        </ScrollView>
      )
    }

    if(this.props.error && !this.props.loadingTrains){
      return(
        <ErrorModalContainer navigation={this.props.navigation} message='There must be a problem with your request. Please check the information and seach again'/>
      )
    }

    else if(this.props.loadingTrains) {
      var trains = {}
      return(
        <View style={[common.marginTop80, common.center]}>
          <Text style={common.textNormal}> Searching for trains... </Text>
          <Spinner style={common.spinner} type='Circle' isVisible={this.props.isVisible} size={100} />
        </View>
      )
    }
  }
}
