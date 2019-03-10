import React from 'react';
import { Root } from 'native-base'
import { Font, AppLoading } from "expo"
import { Provider } from 'react-redux'
import AppNavigator from './components/AppNavigator'
import { setLocalNotification } from './helpers/notifications'
import { clearAll } from './helpers/storage'
import { store } from './helpers/store'
class App extends React.Component {

  state = { loading: true }

  componentDidMount() {
    // Just for development purpose
    //clearAll()
    setLocalNotification()
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }

    return (

      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App