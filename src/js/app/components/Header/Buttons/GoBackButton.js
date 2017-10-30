import React, { Component, PropTypes }from 'react'
import { Button, Text, View, } from 'react-native'
import { Icon } from 'react-native-elements'


export default class GoBackButton extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    addCart: PropTypes.bool.isRequired,
  }


  render() {
    let backButton = null
    if(!this.props.addCart){
      backButton =
        <Icon name='arrow-left' type='entypo' size={30} color='#fff' underlayColor= '#e9418b'
          onPress={() => this.props.navigation.goBack() }
        />
    }
    return (
      <View>
        {backButton}
      </View>
    )
  }
}
