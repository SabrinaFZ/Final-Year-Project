'use strict'
// React
import React from 'react'
import { AppRegistry } from 'react-native'
// Redux
import { Provider } from 'react-redux'
import store from './store'

import StackNav from './stackNav'
//import CustomHeader from './components/App/Header/'

class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <StackNav />
      </Provider>
    )
  }
}

export default App
