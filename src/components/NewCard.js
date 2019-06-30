import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { black, gray, blue, white } from "../utils/colors";
import { connect } from 'react-redux';
import { addNewCard } from '../redux/actions/index';
import { addCardToDeck } from '../utils/fakeApi';

class NewCard extends Component {
  state = {
    questionText: null,
    answerText: null,
  }

  handleSubmit = () => {

    const { questionText, answerText } = this.state;
    const { dispatch, navigation } = this.props;
    const { deck } = navigation.state.params;

    const title = deck.title;
    const card = {
      question: questionText,
      answer: answerText
    }

    if (questionText === null || answerText === null) {
      Alert.alert("The question and answer cannot be empty")
      return
    } else {
      return addCardToDeck(title, card)
        .then(() => dispatch(addNewCard(title, card)))
        .then(() => this.props.navigation.navigate('Deck', { deck }))
        .catch((error) => console.warn('Error', error))
    }
  }


  render() {

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textHeader}>What is the content of your new card?</Text>
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
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.textButton}>Create New Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  textHeader: {
    fontSize: 32,
    color: black,
    textAlign: 'center',
  },
  form: {
    marginTop: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: gray,
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',
    fontSize: 18
  },
  button: {
    backgroundColor: blue,
    borderRadius: 6,
    padding: 15,
    marginTop: 40,
    width: 220,
    alignSelf: 'center'
  },
  textButton: {
    fontSize: 18,
    color: white,
    textAlign: 'center',
  }
})

export default connect()(NewCard);
