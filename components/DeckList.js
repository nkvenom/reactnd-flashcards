import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import DeckItem from './DeckItem'
import { fetchDecks } from '../redux/actions'
import { isEmpty } from '../utils/isEmpty'
import { BigButton } from './BigButton'

class DeckList extends Component {
  componentDidMount = () => {
    this.props.fetchDecks()
  };

  gotoDetail = deck => {
    this.props.navigation.navigate('DeckDetail', {
      title: deck.title
    })
  };


  newDeck = deck => {
    this.props.navigation.navigate('NewDeck')
  };

  render() {
    const { decks } = this.props
    return (
      <View style={styles.deckList}>
      <View style={styles.decks}>
        {decks &&
          decks.map(deck => (
            <DeckItem onPress={this.gotoDetail} deck={deck} key={deck.title} />
          ))}
        {isEmpty(decks) && <Text>No decks found</Text>}
        </View>
        <BigButton onPress={this.newDeck}>New Deck</BigButton>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  deckList: {
    flex: 1
  },
  decks: {
    flex: 1
  }
})
const mapStateToProps = ({ decks }) => ({
  decks: Object.values(decks)
})
const mapDispatchToProps = {
  fetchDecks
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
