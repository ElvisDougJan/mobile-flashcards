import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/redux/reducers/index';
import TabContainer from './src/components/TabContainer';
import { Constants } from 'expo';
import { blue, gray } from './src/utils/colors'
import { setLocalNotification } from './src/utils/helpers';

function StatusBar2 ({backgroundColor, ...props}) {
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
        <View style={{flex: 1}}>
          <StatusBar2 backgroundColor={gray} barStyle='light-content'/>
          <TabContainer/>
        </View>
      </Provider>
    );
  }
}

export default App;