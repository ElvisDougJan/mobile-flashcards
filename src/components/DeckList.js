import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/fakeApi'
import { receiveDecks } from '../redux/actions'
import { grey_darken_1, white, amber_darken_3 } from '../utils/colors'

class DeckList extends Component {

	componentDidMount() {
		const { dispatch } = this.props
		getDecks()
			.then(decks => dispatch(receiveDecks(decks)))
			.catch(error => console.warn('Error while getting decks!', error))
	}

	render() {
		const { decks, navigation } = this.props
		let message = decks.length === 0
			? 'cards'
			: decks.length === 1 ? 'card' : 'cards'
		return (
			<ScrollView style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.textHeader}>
						List of Decks
					</Text>
					<View style={styles.list}>
						{decks.map(deck =>
							<TouchableOpacity
								key={deck.title}
								onPress={() => navigation.navigate('Deck', { deck })}
								style={styles.deck}>
								<Text style={styles.title}>{deck.title}</Text>
								<Text style={styles.cardCount}>{`${deck.questions.length} ${message}`}</Text>
							</TouchableOpacity>
						)}
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		padding: 20
	},
	header: {
		marginBottom: 20,
		alignItems: 'center'
	},
	list: {
		marginTop: 30,
		marginBottom: 50
	},
	textHeader: {
		fontSize: 20,
		fontStyle: 'italic',
		color: grey_darken_1,
		textAlign: 'center'
	},
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
		height: 30
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
		decks: Object.values(decks),
		deck: decks[title]
	}
}

export default connect(mapStateToProps)(DeckList)
