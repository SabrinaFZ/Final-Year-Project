import React, { PropTypes, Component } from 'react'
import { ScrollView, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';

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
    post: PropTypes.func.isRequired,
  }

  async findTicketTrains() {
    let { originId, destinationId } = this.getTrainsId()
    try{
      let response = await this.props.post('https://api-southern.stage.otrl.io/jp/journey-plan',{
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
    } catch(errors){
      console.log('Error on posting new journey')
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

  componentWillMount(){
    this.findTicketTrains()
  }

  render(){
    return(
      <View>
        <Text>SelectTicketTrain</Text>
      </View>
    )

  }
}
