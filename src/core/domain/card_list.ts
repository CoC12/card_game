import Card from './card'

export class CardListEmptyException extends Error {}

class CardList {
  cards: Card[]

  constructor(cards: Card[]) {
    this.cards = cards
  }

  length() {
    return this.cards.length
  }

  getTopCard() {
    const card = this.cards.shift()
    if (card == null) {
      throw new CardListEmptyException()
    }
    return card
  }

  addToLast(card: Card) {
    this.cards.push(card)
  }
}

export default CardList
