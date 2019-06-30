import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { black, blue, white, amber_darken_3, grey_darken_1 } from "../utils/colors";
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class DeckItem extends Component {

  render() {
    const { title, deck, navigation } = this.props;
    let numCards = deck ? deck.questions.length : 0;
    let message = numCards === 0
      ? "cards"
      : numCards === 1 ? "card" : "cards";

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Deck', { deck })}
        style={styles.deck}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cardCount}>{`${numCards} ${message}`}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
    color: amber_darken_3,
    borderRadius: 20,
    borderColor: amber_darken_3,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 30,
    width: 300,
    height: 30,
  },
  title: {
    fontSize: 20,
    color: amber_darken_3,
  },
  cardCount: {
    fontSize: 14,
    color: grey_darken_1
  }
})

function mapStateToProps(decks, { title }) {
  return {
    deck: decks[title]
  };
}

export default withNavigation(connect(mapStateToProps)(DeckItem));