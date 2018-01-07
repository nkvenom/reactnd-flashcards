import React from 'react'
import { Provider } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import store from './redux/store'
import { AppStatusBar } from './components/StatusBar'
import { white, purple } from './utils/colors'
import DeckDetail from './components/DeckDetail'
import NewCard from './components/NewCard'

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }

  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
