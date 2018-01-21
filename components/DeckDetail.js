import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Animated, Dimensions, Easing } from 'react-native'
import { purple, white } from '../utils/colors'
import { BigButton } from './BigButton'

class DeckDetail extends Component {
  state = {
    left: null,
    buttonsOpacity: new Animated.Value(0),
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: `Deck: ${title}`
    }
  }

  componentDidMount() {
    const { width } = Dimensions.get('window')
    this.setState(
      {
        left: new Animated.Value(width)
      },
      this.setupAnimation
    )
  }

  setupAnimation = () => {
    const { left, buttonsOpacity } = this.state

    Animated.spring(left, {
      toValue: 0,
      speed: 7,
    }).start()

    Animated.timing(buttonsOpacity, {
      toValue: 1,
      duration: 700,
      easing: Easing.in,
    }).start()
  }

  getCardCount = deck => {
    return deck && deck.cards ? deck.cards.length : 0
  };

  addCard = () => {
    this.props.navigation.navigate('NewCard', {
      title: this.props.title
    })
  };

  startQuiz = () => {
    if (this.getCardCount(this.props.deck) === 0) {
      console.log('First add some cards to the deck')
      return
    }

    this.props.navigation.navigate('QuizCard', {
      title: this.props.title
    })
  };

  render() {
    const { deck } = this.props
    const { left, buttonsOpacity } = this.state

    if (!deck) return null
    return (
      <Animated.View style={[styles.deckDetail, { left }]}>
        <View style={styles.body}>
          <Text style={styles.title}> {deck.title} </Text>
          <Text style={styles.cardCount}> {this.getCardCount(deck)} Cards</Text>
        </View>
        <Animated.View style={[styles.buttons, { opacity: buttonsOpacity }]}>
          <BigButton onPress={this.addCard}>New Question</BigButton>
          <BigButton onPress={this.startQuiz} style={styles.startQuiz}>
            Start Quiz
          </BigButton>
        </Animated.View>
      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
  deckDetail: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC'
  },
  body: {
    flex: 1,
    alignItems: 'center'
  },
  buttons: {},
  title: {
    fontSize: 24
  },
  cardCount: {
    fontSize: 19,
    color: 'darkgrey'
  },
  startQuiz: {
    backgroundColor: white,
    color: purple
  }
})

const mapStateToProps = ({ decks }, { navigation }) => {
  const { title } = navigation.state.params
  return {
    title,
    deck: decks[title]
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)
