import { AsyncStorage } from "react-native"
import * as uuid from 'uuid'

const DECKS = 'DECKS'
const NOTIFICATION_KEY = 'Flashcards:notifications'

// Just for development purpose
export const clearAll = async () => {
    await AsyncStorage.clear()
}

export const getDecks = async () => {
    const decks = await AsyncStorage.getItem(DECKS)
    return decks !== null ? JSON.parse(decks) : {}
}

export const getDeck = async (id) => {
    const decks = await getDecks()
    return {
        ...decks[id],
        id
    }
}

export const saveDeckTitle = async (title) => {
    const decks = await getDecks()
    const id = uuid.v1()
    const newData = {
        ...decks,
        [id]: {
            title,
            questions: [],
            historyQuiz: []
        }
    }

    AsyncStorage.setItem(DECKS, JSON.stringify(newData))
    return {
        deck: {
            ...newData[id],
            id
        },
        decks: newData
    }
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

export const addQuizHistory = async (id, score, numberOfQuestions) => {
    const decks = await getDecks()
    const deck = decks[id]
    const date = Date.now()

    deck.historyQuiz.push({
        score, numberOfQuestions, date
    })

    AsyncStorage.setItem(DECKS, JSON.stringify(decks))

    return decks
}

export const getNotificationConfig = async () => {
    const notification = await AsyncStorage.getItem(NOTIFICATION_KEY)
    return JSON.parse(notification)
}

export const setNotificationConfig = () => {
    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
}

export const removeNotificationConfig = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
}

