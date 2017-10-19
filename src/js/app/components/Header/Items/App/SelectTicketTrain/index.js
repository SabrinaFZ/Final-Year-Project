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
    console.log('find')
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
          outward: `${this.props.outward}`,
          returnBack: `${this.props.returnBack}`,
          adults: `${this.props.adults}`,
          children: `${this.props.children}`,
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
