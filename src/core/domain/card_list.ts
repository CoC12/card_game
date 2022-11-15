import Card from './card'
import sleep from '~/core/sleep'

export class CardListEmptyException extends Error {}
export class CardDoesNotExistsException extends Error {}

class CardList {
  cards: Card[]
  limitCount = -1

  constructor(cards: Card[]) {
    this.cards = cards
  }

  length() {
    return this.cards.length
  }

  popCardById(id: string) {
    const card = this.cards.find((card) => card.id === id)
    if (!card) {
      throw new CardDoesNotExistsException()
    }
    this.cards = this.cards.filter((card) => card.id !== id)
    return card
  }

  popTopCard() {
    const card = this.cards.shift()
    if (card == null) {
      throw new CardListEmptyException()
    }
    return card
  }

  addToLast(card: Card) {
    this.cards.push(card)
    this.validate()
  }

  async validate() {
    if (this.limitCount < 0) {
      return
    }
    if (this.limitCount < this.cards.length) {
      await sleep(1000)
      this.cards.pop()
    }
  }
}

export default CardList
