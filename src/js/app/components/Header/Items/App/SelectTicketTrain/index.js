import React, { PropTypes, Component } from 'react'
import { ScrollView, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';
import Spinner from 'react-native-spinkit'
import { NavigationActions } from 'react-navigation'

import ErrorModalContainer from './../../../../../containers/ErrorModal'

import SelectTicketTrainOutwardContainer from './../../../../../containers/SelectTicketTrain/SelectTicketTrainOutward'

import SelectTicketTrainReturnContainer from './../../../../../containers/SelectTicketTrain/SelectTicketTrainReturn'

import common from './../../../../../../../styles'

export default class SelectTicketTrain extends Component {
  constructor(props){
    super(props)

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

  componentWillMount(){
    this.findTicketTrains()
    this.forceUpdate()
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

  render(){
    if(!this.props.loadingTrains && this.props.error==false){
      if(!this.props.addReturn){
        return (
          <SelectTicketTrainOutwardContainer navigation={this.props.navigation}/>
        )
      } else {
        return (
          <SelectTicketTrainReturnContainer navigation={this.props.navigation}/>
        )
      }

    }

    if(this.props.error && !this.props.loadingTrains){
      return(
        <ErrorModalContainer navigation={this.props.navigation} message='There must be a problem with your request. Please check the information and try again'/>
      )
    }

    if(this.props.loadingTrains) {
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
