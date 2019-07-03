import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { black, gray, white, amber_darken_3 } from '../utils/colors'
import { connect } from 'react-redux'
import { addNewCard } from '../redux/actions'
import { addCardToDeck } from '../utils/fakeApi'

class NewCard extends Component {
  state = {
    questionText: null,
    answerText: null,
  }

  createNewCard = () => {
    const { questionText, answerText } = this.state
    const { dispatch, navigation } = this.props
    const { deck } = navigation.state.params

    const title = deck.title
    const card = {
      question: questionText,
      answer: answerText
    }

    !questionText || !answerText
      ? Alert.alert('The question and answer cannot be empty')
      : addCardToDeck(title, card)
        .then(() => dispatch(addNewCard(title, card)))
        .then(() => this.props.navigation.navigate('Deck', { deck }))
        .catch((error) => console.warn('Error', error))
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textTitle}>What is the content of your new card?</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            name='questionText'
            style={styles.textInput}
            placeholder='Question'
            onChangeText={(questionText) => this.setState({ questionText })}
          />
          <TextInput
            name='questionText'
            style={styles.textInput}
            placeholder='Answer'
            onChangeText={(answerText) => this.setState({ answerText })}
          />
          <TouchableOpacity style={styles.buttonNew} onPress={this.createNewCard}>
            <Text style={styles.textButton}>Create New Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    justifyContent: 'flex-start'
  },
  textTitle: {
    fontSize: 32,
    color: black,
    textAlign: 'center'
  },
  form: {
    marginTop: 10
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: gray,
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',
    fontSize: 18
  },
  buttonNew: {
    backgroundColor: white,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2
    },
    shadowRadius: 3.84,
    elevation: 15,
    shadowOpacity: 0.5,
    borderRadius: 6,
    padding: 15,
    marginTop: 40,
    width: 220,
    alignSelf: 'center'
  },
  textButton: {
    fontSize: 18,
    color: amber_darken_3,
    textAlign: 'center'
  }
})

export default connect()(NewCard)
