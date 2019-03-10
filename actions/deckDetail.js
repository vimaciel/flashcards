import { getDeck, addCardToDeck, addQuizHistory } from '../helpers/storage'
import { getAllDecks } from '../actions/decks'
export const GET_DECK_DETAIL = 'GET_DECK_DETAIL'
import { clearLocalNotification, setLocalNotification } from '../helpers/notifications'

export function getDeckDetail(deck) {
    return {
        type: GET_DECK_DETAIL,
        deck
    }
}

export function handleGetDeckDetail(id) {
    return (dispatch) => {
        getDeck(id).then(deck => {
            console.log(deck);
            
            dispatch(getDeckDetail(deck))
        })
    }
}

export function handleAddNewCard(id, question, answer) {
    return (dispatch) => {
        addCardToDeck(id, question, answer).then(decks => {
            dispatch(getDeckDetail(decks[id]))
            dispatch(getAllDecks(decks))
        })
    }
}

export function handleAddQuizHistory(id, score, numberOfQuestions) {
    return (dispatch) => {
        addQuizHistory(id, score, numberOfQuestions).then(decks => {
            // Clearing old notification and then creating a new one
            clearLocalNotification()
                .then(setLocalNotification)

            dispatch(getDeckDetail(decks[id]))
            dispatch(getAllDecks(decks))
        })
    }
}