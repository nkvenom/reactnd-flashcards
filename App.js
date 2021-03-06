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
import NewDeck from './components/NewDeck'
import QuizCard from './components/QuizCard'
import QuizResults from './components/QuizResults'
import { setLocalNotification, } from './utils/notifications'

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      title: '⚡🌎 Flash Cards',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  QuizCard: {
    screen: QuizCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  QuizResults: {
    screen: QuizResults,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})


console.log('running App.js')
export default class App extends React.Component {
  componentDidMount() {
    console.log('App Comp:mounted')
    this.setupNotifications()
  }

  setupNotifications = async () => {
    setLocalNotification()
  }

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
    flex: 1
  }
})
