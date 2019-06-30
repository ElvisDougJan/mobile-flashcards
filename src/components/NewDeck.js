import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { black, gray, blue, white } from "../utils/colors";
import { addDeck } from '../redux/actions/index';
import { createDeck } from '../utils/fakeApi';

class NewDeck extends Component {
	state = {
		text: null,
	}

	handleSubmit = () => {
		const { decks, dispatch, navigation } = this.props;
		const { text } = this.state;
		if (text === null) {
			Alert.alert("The deck title can't be empty")
			return
		}
		if (decks[text]) {
			Alert.alert("There's already a deck with this name")
			return
		} else {
			const deck = { title: text, questions: [] }
			return createDeck(text)
				.then(() => {
					dispatch(addDeck(text))
					navigation.navigate('Deck', { deck })
				})
				.catch((error) => console.warn('Error', error))
		}

	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.textHeader}>What is the title of your new deck?</Text>
				</View>
				<View style={styles.form}>
					<TextInput
						style={styles.textInput}
						placeholder='Deck Title'
						onChangeText={(text) => this.setState({ text })}
						value={this.state.title}
					/>
					<TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
						<Text style={styles.textButton}>Create New Deck</Text>
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

function mapStateToProps(decks) {
	return {
		decks
	}
}
export default connect(mapStateToProps)(NewDeck);