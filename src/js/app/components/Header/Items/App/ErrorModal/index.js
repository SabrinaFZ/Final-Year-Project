import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native'
import { Icon } from 'react-native-elements'

import common from './../../../../../../../styles'

export default class ErrorModal extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    error: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }

  render(){
    return(
      <View>
        <Modal
          animationType='none'
          transparent={true}
          visible={this.props.error}
          onRequestClose={() => this.props.navigation.goBack()}
          >
          <View style={[common.marginLeftRight40, common.backgroundColorWhite, common.marginTop80, common.box, common.padding40]}>
            <Icon name='error' type='MaterialIcons' color='#e9418b' size={50}/>
            <Text style={[common.marginTop10, common.textNormal, common.textCenter]}>{this.props.message}</Text>
          </View>
       </Modal>
      </View>
    )
  }
}
