import React, { PropTypes, Component } from 'react'
import { ScrollView, Platform, Modal, TextInput, Button, Picker, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment';

import common from './../../../../../../../styles'

export default class SelectTicketTrain extends Component {
  constructor(props){
    super(props)
  }

  async findTicketTrains() {
    try{
      let response = await this.props.post('http://10.0.2.2:8080/api/jp/journey-plan',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          origin: `${this.props.originSelected}`,
          destination: `${this.props.destinationSelected}`,

        })
      })
    } catch(errors){
      console.log('Error on posting new journey')
    }
  }

  render(){
    return(
      <View>
        <Text>SelectTicketTrain</Text>
      </View>
    )

  }
}
