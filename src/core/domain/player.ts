import Deck from './deck'
import Hand from './hand'
import Field from './field'
import Card from './card'
import sleep from '~/core/sleep'
import GameController from '~/core/game_controller'

class Player {
  assets = 1000
  life = 20

  deck: Deck
  hand: Hand
  field: Field
  // eslint-disable-next-line no-use-before-define
  opponentPlayer: Player | null = null

  canAct = false

  constructor(deck: Deck) {
    this.deck = deck
    this.hand = new Hand()
    this.field = new Field()
    this.deck.cards.forEach((card) => {
      card.setOwner(this)
    })
  }

  setOpponentPlayer(opponentPlayer: Player) {
    this.opponentPlayer = opponentPlayer
  }

  async draw(count: number) {
    for (let i = 0; i < count; i++) {
      const card = this.deck.popTopCard()
      this.hand.addToLast(card)
      await sleep(300)
    }
  }

  async payCost() {
    for (const card of this.field.cards) {
      this.assets -= card.cost
      await sleep(300)
    }
  }

  waitAction(_: GameController) {}

  employ(card: Card) {
    this.hand.popCardById(card.id)
    this.field.addToLast(card)
  }
}

export default Player
