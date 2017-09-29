'use strict'
// React
import React from 'react'
import { AppRegistry } from 'react-native'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// Navigation
import HeaderNavigation from './components/Header/'

class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <HeaderNavigation />
      </Provider>
    )
  }
}

export default App
