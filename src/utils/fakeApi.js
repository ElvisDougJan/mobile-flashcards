import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'DECK_STORAGE_KEY'

const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function starterData() {
	AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
	return decks
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((results) => {
			return results === null ? starterData() : JSON.parse(results)
    })
}

export function createNewDeck(title) {
  const newDeck = {
    title,
    questions: []
}
return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: newDeck
}))
}

export function removeDeckStorage(title) {
  return getDecks()
    .then((results) => {
        delete results[title]
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(results))
    })
}

export function addCardToDeck(title, card) {
  return getDecks()
    .then((results) => {
      results[title].questions.push(card)
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(results))
    })
}

