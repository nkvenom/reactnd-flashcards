import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import DeckItem from './DeckItem'
import dummyDb from '../temp/db-like.json'

class DeckList extends Component {
  gotoDetail = (deck) => {
    console.log('this.props.navigation=', this.props.navigation)
    this.props.navigation.navigate('DeckDetail', {
      title: deck.title
    })
  }

  render() {
    const { decks } = this.props
    return (
      <View>
        {decks && decks.map(deck => (<DeckItem onPress={this.gotoDetail} deck={deck} key={deck.title}>{deck.title}</DeckItem>))}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
    decks: Object.values(dummyDb)
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(DeckList)