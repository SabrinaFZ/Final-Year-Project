'use strict'
// React
import React from 'react'
import { AppRegistry } from 'react-native'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// Navigation
// import HeaderNavigation from './components/Header/'
// import UserHeaderNavigation from './components/Header/UserHeader'

import AppNavigation from './components/Header'
import WelcomeNavigation from './components/Welcome'

class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <WelcomeNavigation />
      </Provider>
    )
  }
}

export default App
