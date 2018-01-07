import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export class DeckItem extends Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  onPress = () => {
    this.props.onPress(this.props.deck)
  }

  render() {
      const { deck } = this.props
    return (
      <View style={styles.main}>
        <TouchableOpacity style={styles.bigButton} onPress={this.onPress}>
          <Text style={styles.title}>{deck.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main: {
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        padding: 5,
    },
    title: {
        fontSize: 19,
    },
    bigButton: {
        flex: 1
    }
})
export default DeckItem
