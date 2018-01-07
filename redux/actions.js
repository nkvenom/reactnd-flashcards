import * as api from '../utils/api'
import dummyDb from '../data/dummy-db.json'
import * as types from './actionTypes'



export const addCard = (card) => ({
  type: types.ADD_CARD,
  card,
})

export const fetchDecks = () => async dispatch => {
  let decks = await api.fetchDecks()
  console.log('found som decks=', decks)
  if (!decks) {
    decks = dummyDb
  }

  dispatch(fetchDecksSuccess(decks))
  return decks
}

export const fetchDecksSuccess = (decks) => ({
  type: types.FETCH_DECKS_SUCCESS,
  decks
})
