'use strict'
import React from 'react'
import { View, TextInput, TouchableOpacity, Text} from 'react-native'
import { Icon } from 'react-native-elements'

import common from '../../../../../styles'

import { FormLabel, FormValidationMessage } from 'react-native-elements'

export default class Login extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      isLogged: false,
      error: null,
    }
  }

  render(){
    return(
      <View style={common.containerForm}>
        <Text style={common.textBold}>Email</Text>
        <TextInput style={common.input} placeholder='Enter your email'/>

        <Text style={common.textBold}>Password</Text>
        <TextInput style={common.input} placeholder='Enter your password' secureTextEntry={true}/>

        <TouchableOpacity
          onPress={ () => this.props.navigation.navigate('StackApp') }
          style={common.submit} activeOpacity={0.8}
            >
          <Text style={common.textSubmit}>{'SUBMIT'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
