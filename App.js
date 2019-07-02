import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/redux/reducers'
import TabIndex from './src/utils/tabIndex'
import { Constants } from 'expo'
import { gray } from './src/utils/colors'
import { setLocalNotification } from './src/utils/helpers'

function StatusBar2({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <StatusBar2 backgroundColor={gray} barStyle='light-content' />
          <TabIndex />
        </View>
      </Provider>
    )
  }
}

export default App