import * as storage from "../helpers/storage"
import { getDeckDetail } from './deckDetail'
export const GET_ALL_DECKS = 'GET_ALL_DECKS'

export function getAllDecks(decks) {
    return {
        type: GET_ALL_DECKS,
        decks
    }
}

export function handleGetAllDecks() {
    return (dispatch) => {
        storage.getDecks().then(decks => {
            dispatch(getAllDecks(decks))
        })
    }
}

export function handleSaveDeck(title) {
    return (dispatch) => {
        storage.saveDeckTitle(title).then(({ deck, decks }) => {    
            console.log(deck);
                    
            dispatch(getDeckDetail(deck))
            dispatch(getAllDecks(decks))
        })
    }
}