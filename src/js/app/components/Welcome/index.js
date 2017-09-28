import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


class Welcome extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <View style={welcomeStyles.container}>
        {/* <Image
          source={require('../../../../images/train_icon.svg')}
        /> */}
        <Text style={welcomeStyles.welcome}> Welcome ! </Text>
      </View>
    )
  }
}

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 40,
    fontWeight: '500',
    textAlign: 'center',
    margin: 10,
    color: '#2E2E2E',
    fontFamily: 'Cochin',
  },
});



export default Welcome
