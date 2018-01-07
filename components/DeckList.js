import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import DeckItem from './DeckItem'
import { fetchDecks } from '../redux/actions'


class DeckList extends Component {
  componentDidMount = () => {
    this.props.fetchDecks()
  }


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

const mapStateToProps = ({decks}) => ({
    decks: Object.values(decks)
})
const mapDispatchToProps = {
  fetchDecks
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
