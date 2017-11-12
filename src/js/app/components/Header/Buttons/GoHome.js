import React, { Component, PropTypes }from 'react'
import { Button, Text, View} from 'react-native'
import { Icon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'


export default class GoHome extends Component {
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
        key: 'CustomHeader',
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'ShoppingCart' }),
          NavigationActions.navigate({ routeName: 'DrawerScreen' }),
        ]
      })
    )
  }


  render() {
    let backButton = null
    if(!this.props.addCart){
      backButton =
        <Icon name='home' type='entypo' size={30} color='#fff' underlayColor= '#e9418b'
          onPress={() => this.props.navigation.navigate('App') }
        />
    }else{
      backButton =
        <Icon name='home' type='entypo' size={30} color='#fff' underlayColor= '#e9418b'
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
