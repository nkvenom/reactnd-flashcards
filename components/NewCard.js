import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'
import { BigButton } from './BigButton'
import { addCard } from '../redux/actions'


class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: `New Card for ${title}`
    }
  };

  render() {
    return (
      <View style={styles.deckDetail}>
        <View style={styles.body}>
        </View>
        <View style={styles.buttons}>
          <BigButton onPress={this.addCard}>Submit</BigButton>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  deckDetail: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  buttons: {
  },
  startQuiz: {
    backgroundColor: white,
    color: purple,
  }
})
const mapDispatchToProps = {
  addCard
}
export default connect(null, mapDispatchToProps)(NewCard)
