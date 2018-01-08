import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'
import { BigButton } from './BigButton'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: `Deck: ${title}`
    }
  };

  getCardCount = deck => {
    return deck && deck.cards ? deck.cards.length : 0
  };

  addCard = () => {
    this.props.navigation.navigate('NewCard', {
      title: this.props.title
    })
  };

  render() {
    const { deck } = this.props

    if (!deck) return null
    return (
      <View style={styles.deckDetail}>
        <View style={styles.body}>
          <Text style={styles.title}> {deck.title} </Text>
          <Text style={styles.cardCount}> {this.getCardCount(deck)} Cards</Text>
        </View>
        <View style={styles.buttons}>
          <BigButton onPress={this.addCard}>Add Card</BigButton>
          <BigButton style={styles.startQuiz}>Start Quiz</BigButton>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  deckDetail: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
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

const mapStateToProps = (
  {decks},
  {navigation}
) => {
  const { title } = navigation.state.params
  return {
    title,
    deck: decks[title]
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)
