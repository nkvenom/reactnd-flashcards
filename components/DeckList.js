import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

class DeckList extends Component {
  render() {
    return (
      <View>
        <Text> Imma Deck 2 </Text>
      </View>
    )
  }
}
export default connect(null, null)(DeckList)