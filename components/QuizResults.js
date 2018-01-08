import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import { BigButton } from './BigButton'
import { addDeck } from '../redux/actions'

class QuizResults extends Component {
  state = {
    title: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz Results',
    }
  };

  render() {
    return (
      <View style={styles.deckDetail}>
        <View style={styles.body}>
          <Text style={styles.title}>Results</Text>
        </View>
        <View style={styles.buttons}>
          <BigButton style={styles.submitButton} onPress={this.addDeck}>
            Do something
          </BigButton>
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
    alignItems: 'stretch'
  },
  buttons: {},
  submitButton: {
    marginTop: 10
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
    height: 80
  }
})
const mapDispatchToProps = {
  addDeck
}
const mapStateToProps = (state, { navigation }) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(QuizResults)
