import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { black, blue } from "../utils/colors";
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
    color: black,
    marginTop: 10,
    marginBottom: 10,
    padding: 30,
    width: 300,
    height: 80,
  },
  title: {
    fontSize: 20,
    color: black,
  },
  cardCount: {
    fontSize: 14,
    color: black
  }
})

function mapStateToProps(decks, { title }) {
  return {
    deck: decks[title]
  };
}

export default withNavigation(connect(mapStateToProps)(DeckItem));