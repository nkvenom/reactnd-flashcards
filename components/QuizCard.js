import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'
import { BigButton } from './BigButton'
import { TextButton } from './TextButton'
import { red, blue } from '../utils/colors'

class QuizCard extends Component {
  state = {
    // The current question index
    cardIdx: 0,
    wrongCount: 0,
    correctCount: 0,
    showAnswer: false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz Mode'
    }
  }

  showAnswer = () => {
    console.log('shiwAns pressed')
    this.setState(({ showAnswer }) => ({
      showAnswer: !showAnswer
    }))
  }

  scoreAnswer = (option) => {
    const { wrongCount, correctCount, cardIdx } = this.state
    let updatedCorrectCount = correctCount
    let updatedWrongCount = wrongCount
    const { deck } = this.props
    if (option === 'correct') {
      updatedCorrectCount++
      this.setState({
        correctCount: updatedCorrectCount
      })
    } else {
      updatedWrongCount++
      this.setState({
        wrongCount: updatedWrongCount
      })
    }

    if (cardIdx === deck.cards.length - 1) {
      this.props.navigation.navigate('QuizResults', {
        title: deck.title,
        correctCount: updatedCorrectCount,
        wrongCount: updatedWrongCount,
      })

      console.log('Going to results')
      return
    }

    this.setState({ cardIdx: cardIdx + 1, showAnswer: false, })
  }

  wrongPress = () => {
    this.scoreAnswer('wrong')
  }

  correctPress = () => {
    this.scoreAnswer('correct')
  }


  render() {
    const { cardIdx } = this.state
    const { deck } = this.props
    const card = deck.cards[cardIdx]
    return (
      <View style={styles.deckDetail}>
        <View style={styles.progress}>
          <Text>{cardIdx + 1} / {deck.cards.length}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.question}>{card.question}</Text>

          {this.state.showAnswer ? (
            <Text style={styles.answer}>{card.answer}</Text>
          ) : (
            <TextButton onPress={this.showAnswer}>Show Answer</TextButton>
          )}
        </View>

        <View style={styles.buttons}>
          <BigButton style={styles.goodButton} onPress={this.wrongPress}>
            Incorrect
          </BigButton>

          <BigButton style={styles.badButton} onPress={this.correctPress}>
            Correct
          </BigButton>
        </View>
      </View>
    )
  }
}

const actionButton = {
  marginLeft: 10,
  marginRight: 10,
  paddingLeft: 10,
  paddingRight: 10,
}
const styles = StyleSheet.create({
  deckDetail: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  body: {
    flex: 1,
    marginTop: 10,
    alignItems: 'stretch'
  },
  question: {
    textAlign: 'center',
    height: 80,
    fontSize: 28
  },
  answer: {
    height: 80,
    fontSize: 24
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  goodButton: {
    ...actionButton,
    backgroundColor: red,
  },
  badButton: {
    ...actionButton,
    backgroundColor: blue,
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
})
const mapDispatchToProps = {}
const mapStateToProps = ({ decks }, { navigation }) => {
  const { title } = navigation.state.params
  return {
    title: title,
    deck: decks[title]
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizCard)
