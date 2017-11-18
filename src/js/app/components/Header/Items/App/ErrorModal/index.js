import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert
} from 'react-native'
import { Icon } from 'react-native-elements'

import common from './../../../../../../../styles'

export default class ErrorModal extends Component {
  constructor(props){
    super(props)

    this.showAlert = this.showAlert.bind(this)
    this.onPressAlert = this.onPressAlert.bind(this)
  }

  static propTypes = {
    error: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired
  }

  onPressAlert(){
    this.props.navigation.goBack()
    this.props.setError(false)
  }

  showAlert(){
    Alert.alert(
      'Ups!',
      `${this.props.message}`,
      [
        {text: 'Try Again', onPress: () => this.onPressAlert()},
      ],
      { cancelable: false }
    )
  }

  render(){
    return(
      <View>
        { this.showAlert() }
        {/* <Modal
          animationType='none'
          transparent={false}
          visible={this.props.error}
          onRequestClose={() => this.props.navigation.goBack()}
          >
          <View style={common.container}>
            <ScrollView contentContainerStyle={common.padding40}>
              <View style={[common.box, common.backgroundColorWhite, common.padding40]}>
                <Icon name='error' type='MaterialIcons' color='#e9418b' size={50}/>
                <Text style={[common.marginTop10, common.textNormal, common.textCenter]}>{this.props.message}</Text>
              </View>
            </ScrollView>
          </View>
       </Modal> */}
      </View>
    )
  }
}
