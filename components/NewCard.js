import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Keyboard, TextInput, View, StyleSheet } from 'react-native'
import { BigButton } from './BigButton'
import { addCard } from '../redux/actions'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: `New Card for ${title}`
    }
  }

  questionChange = text => {
    this.setState({
      question: text
    })
  }

  answerChange = text => {
    this.setState({
      answer: text
    })
  }

  addCard = (e) => {
    const card = this.state
    const { title: deckTitle } = this.props
    this.props.addCard(card, deckTitle)
    this.props.navigation.navigate('DeckDetail', {
      title: deckTitle,
    })
    Keyboard.dismiss()
  }

  render() {
    return (
      <View style={styles.deckDetail}>
        <View style={styles.body}>
          <TextInput
            placeholder="Enter the question"
            style={styles.textInput}
            value={this.state.question}
            onChangeText={this.questionChange}
          />
          <TextInput
            placeholder="Enter the answer"
            style={[styles.textInput, styles.textAnswer]}
            value={this.state.answer}
            onChangeText={this.answerChange}
          />
        </View>
        <View style={styles.buttons}>
          <BigButton style={styles.submitButton} onPress={this.addCard}>Submit</BigButton>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  deckDetail: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  body: {
    marginTop: 10,
    alignItems: 'stretch',
  },
  buttons: {},
  submitButton: {
    marginTop: 10,
  },
  textInput: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 19,
    height: 50,
    padding: 5,
    borderColor: '#DDDDDD',
    borderWidth: 1
  },
  textAnswer: {
    height: 80,
  }
})
const mapDispatchToProps = {
  addCard
}
const mapStateToProps = (state, {navigation}) =>({
  title: navigation.state.params.title
})
export default connect(mapStateToProps, mapDispatchToProps)(NewCard)
