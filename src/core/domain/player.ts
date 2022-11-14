import Deck from './deck'
import Hand from './hand'
import sleep from '~/core/sleep'
import GameController from '~/core/game_controller'

class Player {
  assets = 1000
  life = 20

  deck: Deck
  hand: Hand

  constructor(deck: Deck) {
    this.deck = deck
    this.hand = new Hand()
  }

  async draw(count: number) {
    for (let i = 0; i < count; i++) {
      const card = this.deck.getTopCard()
      this.hand.addToLast(card)
      await sleep(300)
    }
  }

  waitAction(_: GameController) {}
}

export default Player
