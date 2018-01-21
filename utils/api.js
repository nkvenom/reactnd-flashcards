import { AsyncStorage } from 'react-native'
import dummyDb from '../data/dummy-db.json'
import { formatDate } from './formatDate'


const DECKS_STORAGE_KEY = 'FlashCards:Decks'
const QUIZ_STATUS_KEY = 'FlashCards:Quiz'

export async function createDummyDb() {
  return await saveDecks(dummyDb)
}

export async function fetchDecks() {
  const strDecks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
  if (!strDecks) {
    console.log('no decks found, loading dummy db')
    await createDummyDb()
    return dummyDb
  }
  return JSON.parse(strDecks)
}

export function saveDecks(decks) {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
}

export function saveDeck(deck) {
  const updatedDeck = { ...deck }
  const payload = { [deck.title]: updatedDeck }
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(payload))
}

export function addCard({ card, deck }) {
  const updatedDeck = { ...deck }
  updatedDeck.cards = updatedDeck.cards || []
  updatedDeck.cards = [...updatedDeck.cards, card]
  const payload = { [deck.title]: updatedDeck }
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(payload))
}

export function setTodayQuizCompleted() {
  const date = new Date()
  const strDate = formatDate(date)
  return AsyncStorage.setItem(QUIZ_STATUS_KEY, JSON.stringify({
    studyStatus: {
      date: strDate,
      status: true,
    }
  }))
}

export async function hasStudiedToday() {
  const strToday = formatDate(new Date())

  const lastStudyStatus = await AsyncStorage.getItem(QUIZ_STATUS_KEY)
  if (!lastStudyStatus) return false

  const lastSuccessDate = lastStudyStatus.date

  if (strToday === lastSuccessDate)  return true

  return false
}
