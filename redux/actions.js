import * as api from '../utils/api'
import * as types from './actionTypes'

export const failure = error => ({
  error: error.message,
  stack: error.stack
})

export const addCardSuccess = (card, deckTitle) => ({
  type: types.ADD_CARD_SUCCESS,
  deckTitle,
  card
})

export const addDeckSuccess = (deck) => ({
  type: types.ADD_DECK_SUCCESS,
  deck
})

export const addCard = (card, deckTitle) => async (dispatch, getState) => {
  const { decks: { [deckTitle]: deck } } = getState()
  api.addCard({ card, deck })
  dispatch(addCardSuccess(card, deckTitle))
}

export const addDeck = (deckTitle) => async (dispatch, getState) => {
  const deck = { title: deckTitle, cards: [] }
  const res = await api.saveDeck(deck)
  return dispatch(addDeckSuccess(deck))
}

export const fetchDecks = () => async dispatch => {
  try {
    let decks = await api.fetchDecks()

    dispatch(fetchDecksSuccess(decks))
    return decks
  } catch (error) {
    return dispatch(failure(error))
  }
}

export const fetchDecksSuccess = decks => ({
  type: types.FETCH_DECKS_SUCCESS,
  decks
})
