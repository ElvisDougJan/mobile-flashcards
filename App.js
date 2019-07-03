import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/redux/reducers'
import TabIndex from './src/utils/tabIndex'
import { Constants } from 'expo'
import { gray } from './src/utils/colors'
import { setLocalNotification } from './src/utils/helpers'

class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <View style={styles.statusBar}>
            <StatusBar translucent backgroundColor={gray}/>
          </View>
          <TabIndex />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: 'grey',
    height: Constants.statusBarHeight
  }
})

export default App