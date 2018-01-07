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

  componentDidMount = () => {
    console.log('this.props=', this.props)
  };

  addCard = () => {
    console.log('this.props.title=', this.props.title)
    this.props.navigation.navigate('NewCard', {
      title: this.props.title
    })
  };

  render() {
    return (
      <View style={styles.deckDetail}>
        <View style={styles.body}>
          <Text style={styles.title}> React </Text>
          <Text style={styles.cardCount}> 5 Cards</Text>
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
  state,
  {navigation}
) => {
  const { title } = navigation.state.params
  return {
    title
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)
