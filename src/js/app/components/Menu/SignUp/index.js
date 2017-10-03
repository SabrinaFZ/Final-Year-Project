'use strict'
import React from 'react'
import { BackHandler, AsyncStorage, View, TextInput, TouchableOpacity, Text} from 'react-native'
import { Button, Icon } from 'react-native-elements'

import common from '../../../../../styles'

import { FormLabel, FormValidationMessage } from 'react-native-elements'

const ACCESS_TOKEN = 'access_token'

export default class SignUp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      isLogged: false,
      error: null,
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this._BackAndroid.bind(this));
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress',this._BackAndroid.bind(this));
  }

  _BackAndroid=()=>{
   this.props.navigation.goBack();
   return false
  }

  async storeToken(access_token){
    try{
      await AsyncStorage.setItem(ACCESS_TOKEN, access_token)
      this.getToken()
    }catch(error){
      console.log("ERROR: Can't store access token")
    }
  }

  async getToken(){
    try{
      let token = await AsyncStorage.getItem(ACCESS_TOKEN)
      console.log("token is"+ token)
    }catch(error){
      console.log("ERROR: Can't get access token")
    }
  }

  async removeToken(){
    try{
      await AsyncStorage.removeItem(ACCESS_TOKEN)
      this.getToken()
    }catch(error){
      console.log("ERROR: Can't remove access token")
    }
  }

  async handleLogin(){
    console.log("aqui")
    try{
      let response = await fetch('http://10.0.2.2:8080/api/signup',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${this.state.name}`,
          email: `${this.state.email}`,
          password: `${this.state.password}`,
          repeatPassword: `${this.state.repeatPassword}`,
        })
      })

      let res = await response.text()

      if(response.status >= 200 && response.status < 300){
        this.setState({error: null, isLogged: true})
        let accessToken = res
        this.storeToken(accessToken)
        this.props.navigation.navigate('StackApp')
        console.log("Success is: "+ res)
      }else{
        this.setState({error: res, isLogged: false})
      }
    } catch(errors){
        this.removeToken()
        this.setState({error: res, isLogged: false})
    }
  }

  render(){
    return(
      <View style={common.containerForm}>
        <Text style={common.textBold}>Name</Text>
        <TextInput style={common.input} placeholder='Enter your name' value={this.state.name} onChangeText={(name)=> this.setState({name})}/>

        <Text style={common.textBold}>Email</Text>
        <TextInput style={common.input} placeholder='Enter your email' value={this.state.email} onChangeText={(email) => this.setState({email})}/>

        <Text style={common.textBold}>Password</Text>
        <TextInput style={common.input} placeholder='Enter your password' secureTextEntry={true} value={this.state.password} onChangeText={(password)=> this.setState({password})}/>

        <Text style={common.textBold}>Repeat your password</Text>
        <TextInput style={common.input} placeholder='Enter your password again' secureTextEntry={true} value={this.state.repeatPassword} onChangeText={(repeatPassword)=> this.setState({repeatPassword})}/>



        <FormValidationMessage labelStyle={common.errorCredentials}>{this.state.error}</FormValidationMessage>

        <TouchableOpacity
          onPress={ this.handleLogin.bind(this) }
          style={common.submit} activeOpacity={0.8}
          disabled={!this.state.email || !this.state.password || !this.state.name || !this.state.repeatPassword}
            >
          <Text style={common.textSubmit}>{'Submit'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
