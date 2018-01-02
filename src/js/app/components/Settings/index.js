import React, {Component} from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import common from './../../../../styles/'

export default class Settings extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={[common.marginTop50, common.center]}>
        <Icon name='build' type='MaterialIcons' size={100} color='#e9418b' />
        <Text style={[common.marginTop20, common.textNormal, common.textCenter]}>Not implemented yet </Text>
        <Text style={[common.textNormal, common.textCenter]}>Go back to App </Text>
      </View>
    );
  }
}
