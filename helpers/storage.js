import { AsyncStorage } from "react-native"
import * as uuid from 'uuid'

const DECKS = 'DECKS'

export const getDecks = async () => {
    const decks = await AsyncStorage.getItem(DECKS)
    return decks !== null ? JSON.parse(decks) : {}
}

export const getDeck = async (id) => {
    const decks = await getDecks()
    return decks[id]
}

export const saveDeckTitle = async (title) => {
    const decks = await getDecks()
    const id = uuid.v1()
    const newData = {
        ...decks,
        [id]: {
            title,
            questions: []
        }
    }

    AsyncStorage.setItem(DECKS, JSON.stringify(newData))
    return newData
}

export const addCardToDeck = async (id, question, answer) => {
    const decks = await getDecks()
    const deck = decks[id]
    deck.questions.push({
        question, answer
    })

    AsyncStorage.setItem(DECKS, JSON.stringify(decks))

    return decks
}
