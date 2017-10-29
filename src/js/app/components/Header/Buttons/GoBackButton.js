import React, { Component, PropTypes }from 'react'
import { BackHandler, Button, Text, View, } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Icon } from 'react-native-elements'


export default class GoBackButton extends Component {
  constructor(props){
    super(props)

    this.handleOnPress = this.handleOnPress.bind(this)
    //this._BackAndroid = this._BackAndroid.bind(this)
  }

  static propTypes = {
    addCart: PropTypes.bool.isRequired,
  }


  componentWillMount(){
    if(this.props.addCart){
      console.log('3')
      BackHandler.addEventListener('hardwareBackPress',this._BackAndroid);
    }
  }

  componentWillUnmount() {
    console.log('3')
    BackHandler.removeEventListener('hardwareBackPress', this._BackAndroid)
   }

  componentDidMount(){
    if(this.props.addCart){
      console.log('4')
      BackHandler.addEventListener('hardwareBackPress',this._BackAndroid);
    }
  }

  _BackAndroid=()=>{
      //this.props.navigation.goBack();
      return true
   }


  handleOnPress(){
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'ShoppingCart' }),
          NavigationActions.navigate({ routeName: 'DrawerSreen' })
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
    } else {
      backButton =
        <Icon name='home' type='entypo' size={30} color='#fff' underlayColor= '#e9418b'
          onPress={() =>  this.handleOnPress() }
        />
    }
    return (
      <View>
        {backButton}
      </View>
    )
  }
}
