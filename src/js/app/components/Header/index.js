import React, {Component} from 'react'

import {
  View,
  StyleSheet,
  Text
} from 'react-native'

class Header extends Component {

  render(){
    return(
      <View style={headerStyles.container}>
        <View style={headerStyles.nav} />
      </View>
    )
  }

}

const headerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

  },
  nav: {
    flex:1,
    backgroundColor: '#2E9AFE',
    height: 80,
  }

});

export default Header
