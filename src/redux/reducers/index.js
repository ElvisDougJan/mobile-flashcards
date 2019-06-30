import { ADD_DECK, RECEIVE_DECKS, ADD_NEW_CARD, REMOVE_DECK } from '../actions/index';

function decks(state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			}
		case ADD_DECK:
			return {
				...state,
				[action.title]: {
					title: action.title,
					questions: []
				},
		}
		case REMOVE_DECK:
			newState = {
				...state
			}
			delete newState[action.title];
			return newState;
		case ADD_NEW_CARD:
			return {
				...state,
				[action.title] : {
					...state[action.title],
					questions: state[action.title].questions.concat([action.card])
			}
		}
		default:
			return state
	}	
}

export default decks;


