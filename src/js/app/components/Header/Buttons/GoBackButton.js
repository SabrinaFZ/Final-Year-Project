import React, { Component, PropTypes }from 'react'
import { Button, Text, View} from 'react-native'
import { Icon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'


export default class GoBackButton extends Component {
  constructor(props){
    super(props)

    this.handleOnPress = this.handleOnPress.bind(this)
  }

  static propTypes = {
    addCart: PropTypes.bool.isRequired,
  }

  handleOnPress(){
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'DrawerScreen' }),
        ]
      })
    )
  }


  render() {
    let backButton = null
    if(!this.props.addCart){
      backButton =
        <Icon name='arrow-left' type='entypo' size={30} color='#fff' underlayColor= '#e9418b'
          onPress={() => this.props.navigation.goBack() }
        />
    }else{
      backButton =
        <Icon name='arrow-left' type='entypo' size={30} color='#fff' underlayColor= '#e9418b'
          onPress={() => this.handleOnPress() }
        />
    }
    return (
      <View>
        {backButton}
      </View>
    )
  }
}
