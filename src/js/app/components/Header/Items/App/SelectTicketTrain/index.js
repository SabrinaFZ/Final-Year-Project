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
    originSelected: PropTypes.string.isRequired,
    destinationSelected: PropTypes.string.isRequired,
    outward: PropTypes.object.isRequired,
    returnBack: PropTypes.object.isRequired,
    adults: PropTypes.number.isRequired,
    childrenNumber: PropTypes.number.isRequired,
    post: PropTypes.func.isRequired,
  }

  async findTicketTrains() {
    try{
      let response = await this.props.post('https://api-southern.stage.otrl.io/jp/journey-plan',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': '86512cad76131783f5dae4346ddc3fb39f6f7c0f74b3039bff70ca4015ade034',
          //'x-trace-token': '81935270b5c511e7aae9e5aab67b280d-5',
          'Authorization': 'Basic Og=='
        },
        body: JSON.stringify({
          origin: `${this.props.originSelected}`,
          destination: `${this.props.destinationSelected}`,
          outward:	{
            rangeStart:"2017-10-21T18:45:00",
            rangeEnd:"2017-10-21T21:45:00",
            arriveDepart:"Depart"
          },
          // outward: this.props.outward,
          // return: this.props.returnBack,
          openReturn:false,
          adults: `${this.props.adults}`,
          children: `${this.props.childrenNumber}`,
          disableGroupSavings: true,
          showCheapest: false,
          doRealTime: false,
          return:	{
            rangeStart:"2017-10-22T20:45:00",
            rangeEnd:"2017-10-22T23:45:00",
            arriveDepart:"Depart"
          }

          // origin:"1072",
          // destination:"9529",
          // outward:	{
          //   rangeStart:"2017-10-21T18:45:00",
          //   rangeEnd:"2017-10-21T21:45:00",
          //   arriveDepart:"Depart"
          // },
          // openReturn:false,
          // adults:1,
          // children:0,
          // disableGroupSavings:true,
          // showCheapest:false,
          // doRealTime:false,
          // return:	{
          //   rangeStart:"2017-10-21T20:45:00",
          //   rangeEnd:"2017-10-21T23:45:00",
          //   arriveDepart:"Depart"
          // }
        })
      })
    } catch(errors){
      console.log('Error on posting new journey')
    }
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
