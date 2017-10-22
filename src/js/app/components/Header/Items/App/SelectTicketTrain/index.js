import React, { PropTypes, Component } from 'react'
import { ScrollView, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';
import Spinner from 'react-native-spinkit'

import common from './../../../../../../../styles'

export default class SelectTicketTrain extends Component {
  constructor(props){
    super(props)

    this.getTrainsName = this.getTrainsName.bind(this)
    this.getTicketType = this.getTicketType.bind(this)
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
    isLoadingTrains: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    post: PropTypes.func.isRequired,
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

  getTicketType(ticketType){
    let ticket = this.props.journeyPlan.links[ticketType]
    return ticket.name
  }

  componentWillMount(){
    this.findTicketTrains()
  }


  getTrains(){
    var outwardJourney = []
    var returnJourney = []
    var outwardSingleFares = []
    var outwardReturnFares = []
    var returnSingleFares = []
    var returnReturnFares = []
    var journeyOutwardInfo = []
    var journeyReturnInfo = []
    var outwardSinglePrice = []
    var outwardReturnPrice = []
    var returnSinglePrice = []
    var returnReturnPrice = []

    this.props.journeyPlan.result.outward.forEach((item) => {
      outwardJourney.push(item.journey)
      outwardSingleFares.push(item.fares.singles)
    })
    this.props.journeyPlan.result.return.forEach((item) => {
      returnJourney.push(item.journey)
      returnSingleFares.push(item.fares.singles)
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

    // outwardReturnFares.map((value, index) =>{
    //   let aux = []
    //   value.map((fares, i) => {
    //     let item = this.props.journeyPlan.links[fares]
    //     aux.push(item)
    //   })
    //   outwardReturnPrice.push(aux)
    // })


    outwardJourney.map((value, index) => {
      let info = {}
      let item = this.props.journeyPlan.links[value]
      info = {
        origin_station: item.origin.station,
        destination_station: item.destination.station,
        origin_time: item.origin.time.scheduledTime,
        destination_time: item.destination.time.scheduledTime,
        changes: item.changes,
        legs: item.legs,
        status: item.status,
        fares: outwardSinglePrice[index]
      }
      journeyOutwardInfo.push(info)
    })

    returnJourney.map((value, index) => {
      let info = {}
      let item = this.props.journeyPlan.links[value]
      info = {
        origin_station: item.origin.station,
        destination_station: item.destination.station,
        origin_time: item.origin.time.scheduledTime,
        destination_time: item.destination.time.scheduledTime,
        changes: item.changes,
        legs: item.legs,
        status: item.status,
        fares: returnSinglePrice[index]
      }
      journeyReturnInfo.push(info)
    })

    return { journeyOutwardInfo, journeyReturnInfo }
  }

  render(){

    if(this.props.error){
      return(
        <Text> Error </Text>
      )
    }

    if(!this.props.loadingTrains && this.props.error==false){
      //Return an object for outward and journey
      var trains = this.getTrains()
      var info_station_outward = trains.journeyOutwardInfo.map((item, index) => {
        var fares = item.fares.map((fare,i) => {
          return (
            <View key={i}>
              <Text>{fare.totalPrice}</Text>
              <Text>{this.getTicketType(fare.ticketType)}</Text>
            </View>
          )
        })
        return (
          <View key={index} style={[common.marginTop20, common.box, common.padding10]}>
            <Text> Origin Station: {this.getTrainsName(item.origin_station)} </Text>
            <Text> Dest Station {this.getTrainsName(item.destination_station)} </Text>
            <Text> Leaving At: {item.origin_time} </Text>
            <Text> Arriving At: {item.destination_time} </Text>
            <Text> Changes: {item.changes} </Text>
            {fares}
          </View>
        )
      })
      var info_station_return = trains.journeyReturnInfo.map((item, index) => {
        var fares = item.fares.map((fare,i) => {
          return (
            <View key={i}>
              <Text>{fare.totalPrice}</Text>
              <Text>{this.getTicketType(fare.ticketType)}</Text>
            </View>
          )
        })
        return (
          <View key={index} style={[common.marginTop20, common.box, common.padding10]}>
            <Text> Origin Station: {this.getTrainsName(item.origin_station)} </Text>
            <Text> Dest Station {this.getTrainsName(item.destination_station)} </Text>
            <Text> Leaving At: {item.origin_time} </Text>
            <Text> Arriving At: {item.destination_time} </Text>
            <Text> Changes: {item.changes} </Text>
            {fares}
          </View>
        )
      })
      return(
        <ScrollView contentContainerStyle={[common.padding40]}>
          <Text> Outward </Text>
          {info_station_outward}
          <Text> Return </Text>
          {info_station_return}
        </ScrollView>
      )
    } else {
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
