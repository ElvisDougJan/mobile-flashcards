import * as types from './actionsTypes'

export function receiveDecks(decks) {
	return {
		type: types.RECEIVE_DECKS,
		decks,
	}
}

export function addDeck(title) {
	return {
		type: types.ADD_DECK,
		title,
	}
}

export function removeDeck(title) {
	return {
		type: types.REMOVE_DECK,
		title
	}
}

export function addNewCard(title, card) {
	return {
		type: types.ADD_NEW_CARD,
		title,
		card
	}
}
