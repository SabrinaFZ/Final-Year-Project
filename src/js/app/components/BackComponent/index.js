import React, {Component} from 'react';
import {BackHandler} from 'react-native';

export default class BackPageComponent extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress',this._BackAndroid);
    }

    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress',this._BackAndroid);
    }

    _BackAndroid=()=>{
     this.props.navigation.goBack();
     return true
   }
}
