import assert from 'assert'
import sleep from './sleep'
import Player from './domain/player'
import PlayerUser from '~/core/domain/player_user'
import PlayerComputer from '~/core/domain/player_computer'
import Card from '~/core/domain/card'
import GameController from '~/core/game_controller'
import { CardListEmptyException } from '~/core/domain/card_list'

const DEFAULT_HAND_COUNT = 5
const DRAW_COUNT_PER_TURN = 1

class GameManager {
  turnPlayer: Player
  playerComputer: PlayerComputer
  playerUser: PlayerUser
  game_controller: GameController

  isStarted = false
  turnCount = 1

  showSnackBar = false
  snackBarText = ''

  constructor(playerComputer: PlayerComputer, playerUser: PlayerUser) {
    this.playerComputer = playerComputer
    this.playerUser = playerUser

    this.playerComputer.opponentPlayer = this.playerUser
    this.playerUser.opponentPlayer = this.playerComputer

    this.game_controller = new GameController(this)
    this.turnPlayer = this.playerUser
  }

  async start() {
    this.isStarted = true

    this.playerComputer.draw(DEFAULT_HAND_COUNT)
    this.playerUser.draw(DEFAULT_HAND_COUNT)
    await sleep(2000)

    this.showInfo('start match')
    await sleep(1000)

    this.game_loop()
  }

  async game_loop() {
    try {
      assert(this.turnPlayer.opponentPlayer)

      this.turnPlayer.field.cards.forEach((card) => {
        card.onStartedOwnerTurn(card)
      })
      this.turnPlayer.opponentPlayer.field.cards.forEach((card) => {
        card.onStartedOpponentTurn(card)
      })
      this.turnPlayer.field.cards.forEach((card) => {
        card.isActed = false
      })
      this.turnPlayer.increaseAssets(this.getSubsidy())
      await sleep(1000)

      this.turnPlayer.payFieldCardCost()
      await sleep(1000)

      this.turnPlayer.draw(DRAW_COUNT_PER_TURN)
      this.turnPlayer.canAct = true
      this.turnPlayer.waitAction(this.game_controller)
    } catch (e) {
      if (e instanceof CardListEmptyException) {
        this.isStarted = false
      }
    }
  }

  getSubsidy() {
    const baseSubsidy = 1000
    return this.turnCount * baseSubsidy
  }

  contract = (card: Card) => {
    return {
      label: 'Contract',
      disabled: !card.owner?.canAct,
      actionCallback: card.owner?.contract,
    }
  }

  attack = (card: Card) => {
    return {
      label: 'Attack',
      disabled: card.isActed || !card.owner?.canAct,
      actionCallback: card.owner?.attack,
    }
  }

  async changeTurn() {
    this.turnPlayer.canAct = false

    this.showInfo('Change Turn')
    await sleep(2000)

    this.turnCount++

    const opponentPlayer = this.turnPlayer.opponentPlayer
    assert(opponentPlayer)
    this.turnPlayer = opponentPlayer
    this.game_loop()
  }

  showInfo(message: string) {
    this.showSnackBar = true
    this.snackBarText = message
  }
}

export default GameManager
