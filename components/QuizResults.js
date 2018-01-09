import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'
import { BigButton } from './BigButton'
import { addDeck } from '../redux/actions'
import { clearLocalNotification } from '../utils/notifications'

class QuizResults extends Component {
  state = {
    title: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz Results'
    }
  };

  componentDidMount = () => {
    // If we get to this point cancel the notification for today
    clearLocalNotification()
  }


  backToDeck = () => {
    const { deck } = this.props
    this.props.navigation.navigate('DeckDetail', {
      title: deck.title
    })
  };

  restartQuiz = () => {
    const { deck } = this.props
    this.props.navigation.navigate('QuizCard', {
      title: deck.title
    })
  };

  render() {
    const { title, correctCount, wrongCount, deck } = this.props
    const pct = correctCount / deck.cards.length
    return (
      <View style={styles.quizResults}>
        <View style={styles.body}>
          <Text style={styles.title}>Results for {title}</Text>
          <Text style={styles.resultsDetail}>
            Correct answers: {correctCount}
          </Text>
          <Text style={styles.resultsDetail}>Wrong answers: {wrongCount}</Text>

          <View>
            <Text style={styles.titleMainResult}>Your Score</Text>
            <Text style={styles.mainResult}>{(pct * 100).toFixed(1)}% </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <BigButton onPress={this.backToDeck} style={styles.submitButton}>
            Back to Deck
          </BigButton>
          <BigButton onPress={this.restartQuiz} style={styles.submitButton}>
            Restart Quiz
          </BigButton>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  quizResults: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 10,
    alignItems: 'stretch'
  },
  buttons: {
    flex: 0,
  },
  submitButton: {
    marginTop: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    marginBottom: 20,
  },
  resultsDetail: {
    fontSize: 20,
     paddingLeft: 10,
     paddingRight: 10,
  },
  titleMainResult: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 35,
  },
  mainResult: {
    textAlign: 'center',
    fontSize: 60
  }
})
const mapDispatchToProps = {
  addDeck
}
const mapStateToProps = ({ decks }, { navigation }) => {
  const { title, correctCount, wrongCount } = navigation.state.params

  return {
    title,
    correctCount,
    wrongCount,
    deck: decks[title]
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizResults)
