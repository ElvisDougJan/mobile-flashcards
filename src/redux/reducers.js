import * as types from './actionsTypes'

function decks(state = {}, action) {
	switch (action.type) {
		case types.RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			}
		case types.ADD_DECK:
			return {
				...state,
				[action.title]: {
					title: action.title,
					questions: []
				},
		}
		case types.REMOVE_DECK:
			newState = {
				...state
			}
			delete newState[action.title];
			return newState;
		case types.ADD_NEW_CARD:
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


