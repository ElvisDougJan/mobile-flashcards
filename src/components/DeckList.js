import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getDecks } from '../utils/fakeApi';
import { receiveDecks } from '../redux/actions/index';
import DeckItem from './DeckItem';
import { black } from "../utils/colors";

class DeckList extends Component {

	componentDidMount() {

		const { dispatch } = this.props;

		getDecks()
			.then((decks) => dispatch(receiveDecks(decks)))
			.catch((error) => {
				console.warn('Error while getting decks!', error)
			})
	}

	render() {
		const { decks } = this.props;

		return (
			<ScrollView style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.textHeader}>
						Your Decks
                    </Text>
					<View style={styles.list}>
						{decks.map((deck) => <DeckItem key={deck.title} title={deck.title} />)}
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		padding: 20,
	},
	header: {
		marginBottom: 20,
		alignItems: 'center',
	},
	list: {
		marginTop: 30,
	},
	textHeader: {
		fontSize: 32,
		color: black,
		textAlign: 'center',
	},
})

function mapStateToProps(decks) {
	return {
		decks: Object.values(decks)
	}
}

export default connect(mapStateToProps)(DeckList);
