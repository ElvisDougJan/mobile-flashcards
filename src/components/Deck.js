import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { black, blue, white } from "../utils/colors";
import TextButton from './TextButton';
import { removeDeck } from '../redux/actions/index';
import { removeDeckStorage } from '../utils/fakeApi';

class Deck extends Component {

  handleDelete = () => {
    const { deck, dispatch, navigation } = this.props;
    return removeDeckStorage(deck.title)
      .then(() => dispatch(removeDeck(deck.title)))
      .then(() => navigation.navigate('DeckList'))
      .catch((error) => console.warn('Error', error))
  }

  startQuiz = () => {
    const { deck, cardCount, navigation } = this.props;
    if (cardCount <= 0) {
      Alert.alert('This quiz has no cards!')
      return false
    }
    navigation.navigate('Quiz', { deck })
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.cardCount !== this.props.cardCount) {
      return true
    }
    return false
  }

  render() {
    const { deck, cardCount, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cardCount}>This deck has {cardCount} cards</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={this.startQuiz}>
            <Text style={styles.primaryBtnText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate(
              'NewCard',
              { deck }
            )}>
            <Text style={styles.secondaryBtnText}>Add Card</Text>
          </TouchableOpacity>
        </View>
        <TextButton
          onPress={this.handleDelete}>Delete Deck
                </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    justifyContent: 'flex-start'
  },
  title: {
    marginTop: 10,
    fontSize: 32,
    color: black,
    textAlign: 'center'
  },
  cardCount: {
    marginTop: 15,
    fontSize: 20,
    color: '#999',
    textAlign: 'center'
  },
  actions: {
    marginTop: 30,
    alignItems: 'center'
  },
  primaryBtn: {
    backgroundColor: blue,
    borderRadius: 6,
    padding: 15,
    marginTop: 15,
    width: 220,
  },
  secondaryBtn: {
    backgroundColor: white,
    borderRadius: 6,
    borderColor: blue,
    borderWidth: 1,
    padding: 15,
    marginTop: 15,
    width: 220,
  },
  primaryBtnText: {
    fontSize: 18,
    color: white,
    textAlign: 'center',
  },
  secondaryBtnText: {
    fontSize: 18,
    color: blue,
    textAlign: 'center',
  }
})

function mapStateToProps(decks, { navigation }) {

  let deck = decks[navigation.state.params.deck.title]

  if (deck === undefined) {
    deck = {
      title: '',
      questions: []
    }
  }

  return {
    deck,
    cardCount: deck.questions.length
  }
}

export default connect(mapStateToProps)(Deck);
