//Aquí sera la App principal

import React, {Component} from 'react'
import Welcome from './components/Welcome'
import Header from './components/Header'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class App extends Component{

  render(){
    return(
      <View style={appStyles.container}>
        <Header/>
        <View>
          <Welcome/>
        </View>
      </View>
    )
  }
}


const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default App
