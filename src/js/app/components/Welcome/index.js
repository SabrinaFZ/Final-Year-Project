import React, { Component } from 'react';
// import welcomeStyles from '../../../../styles/Welcome'

import {
  StyleSheet,
  Text,
  View
} from 'react-native';


class Welcome extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <View style={welcomeStyles.container}>
        <Text style={welcomeStyles.welcome}> Welcome ! </Text>
      </View>
    )
  }
}

const welcomeStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
  },
  welcome: {
    fontSize: 40,
    fontWeight: '300',
    textAlign: 'center',
    margin: 10,
    color: '#000'
  },
});



export default Welcome
