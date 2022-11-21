import Deck from './deck'
import Hand from './hand'
import Field from './field'
import DestroyedCards from './destroyed_cards'
import Card from './card'
import sleep from '~/core/sleep'
import GameController from '~/core/game_controller'

class Player {
  assets = 1000
  life = 20

  deck: Deck
  hand: Hand
  field: Field
  destroyedCards: DestroyedCards
  // eslint-disable-next-line no-use-before-define
  opponentPlayer: Player | null = null

  canAct = false

  constructor(deck: Deck) {
    this.deck = deck
    this.hand = new Hand()
    this.field = new Field()
    this.destroyedCards = new DestroyedCards()
    this.deck.cards.forEach((card) => {
      card.setOwner(this)
    })
  }

  increaseAssets(assets: number) {
    this.assets += assets
  }

  decreaseAssets(assets: number) {
    this.assets -= assets
  }

  increaseLife(life: number) {
    this.life += life
  }

  async decreaseLife(life: number) {
    await sleep(300)
    this.field.cards.forEach((card) => {
      life = card.onOwnerLifeDecreased(card, life)
    })
    this.life -= life
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

  async payFieldCardCost() {
    for (const card of this.field.cards) {
      this.decreaseAssets(card.cost)
      await sleep(300)
    }
  }

  waitAction(_: GameController) {}

  async contract(card: Card) {
    card.owner?.decreaseAssets(card.cost)
    card.owner?.hand.popCardById(card.id)
    card.owner?.field.addToLast(card)
    await sleep(300)
    card.onContracted(card)
  }

  async attack(card: Card) {
    card.owner?.opponentPlayer?.decreaseLife(card.attack)
    card.isActed = true
    await sleep(300)
    card.onAttacked(card)
  }

  async destroy(destroyedCard: Card) {
    destroyedCard.owner?.field.popCardById(destroyedCard.id)
    destroyedCard.owner?.destroyedCards.addToLast(destroyedCard)
    await sleep(300)
    destroyedCard.onDestroyed(destroyedCard)
    await sleep(300)
    destroyedCard.owner?.field.cards.forEach((card) => {
      card.onOwnerCardDestroyed(card, destroyedCard)
    })
  }
}

export default Player
