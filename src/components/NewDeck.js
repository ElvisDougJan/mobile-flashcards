import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { black, gray, white, amber_darken_3 } from '../utils/colors'
import { addDeck } from '../redux/actions'
import { createNewDeck } from '../utils/fakeApi'

class NewDeck extends Component {
	state = {
		textInput: null
	}

	saveNewDeck = () => {
		const { dispatch, navigation } = this.props
		const textToArray = Array.from(this.state.textInput)

		if (!this.state.textInput || textToArray.every(item => item === ' ')) {
			Alert.alert("The deck title can't be empty")
		} else {
			const deck = {
				title: this.state.textInput.trim(),
				questions: []
			}

			return createNewDeck(deck.title)
				.then(() => {
					this.setState({ textInput: null })
					dispatch(addDeck(deck.title))
					navigation.navigate('Deck', { deck })
				})
				.catch((error) => console.warn('Error', error))
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.textTitle}>
						What is the title of your new deck?
					</Text>
				</View>
				<View style={styles.form}>
					<TextInput
						style={styles.textInput}
						placeholder='Deck Title'
						onChangeText={textInput => this.setState({ textInput })}
						value={this.state.textInput}
					/>
					<TouchableOpacity style={styles.buttonNew} onPress={this.saveNewDeck}>
						<Text style={styles.textButton}>Save New Deck</Text>
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
		justifyContent: 'flex-start',
	},
	textTitle: {
		fontSize: 20,
		fontStyle: 'italic',
		color: black,
		textAlign: 'center',
	},
	form: {
		marginTop: 10,
	},
	textInput: {
		borderBottomWidth: 1,
		borderBottomColor: gray,
		padding: 20,
		backgroundColor: '#fff',
		fontSize: 18
	},
	buttonNew: {
		backgroundColor: white,
		shadowColor: '#000',
		shadowOffset: {
			width: 10,
			height: 2,
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
		textAlign: 'center',
		color: amber_darken_3
	}
})

function mapStateToProps(decks) {
	return {
		decks
	}
}
export default connect(mapStateToProps)(NewDeck)