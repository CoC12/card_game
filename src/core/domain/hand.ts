import CardList from './card_list'
import Card from './card'
import sleep from '~/core/sleep'

const HAND_COUNT_LIMIT = 6

class Hand extends CardList {
  constructor() {
    super([])
  }

  async addToLast(card: Card) {
    super.addToLast(card)
    if (this.cards.length > HAND_COUNT_LIMIT) {
      await sleep(1000)
      this.cards.pop()
    }
  }
}

export default Hand
