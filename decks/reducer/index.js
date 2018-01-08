import { FETCH_DECKS_SUCCESS, ADD_CARD_SUCCESS, ADD_DECK_SUCCESS } from '../../redux/actionTypes'

export default function(state = {}, action) {
  const { deckTitle } = action
  switch (action.type) {
    case FETCH_DECKS_SUCCESS: {
      return { ...state, ...action.decks }
    }

    case ADD_CARD_SUCCESS: {
      const deck = state[deckTitle]
      const { card } = action
      return {
        ...state,
        [deckTitle]: {
          ...deck,
          cards: [...deck.cards, card]
        }
      }
    }

    case ADD_DECK_SUCCESS: {
      const { title } = action.deck
      return {
        ...state,
        [title]: action.deck
      }
    }
    default:
      return state
  }
}
