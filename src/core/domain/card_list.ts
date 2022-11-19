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

  popLastCard() {
    const card = this.cards.pop()
    if (card == null) {
      throw new CardListEmptyException()
    }
    return card
  }

  popRandomCard(condition = (_: Card) => true) {
    const targetCards = this.cards.filter(condition)
    if (targetCards.length === 0) {
      throw new CardDoesNotExistsException()
    }
    const targetIndex = Math.floor(Math.random() * targetCards.length)
    return this.popCardById(targetCards[targetIndex].id)
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
