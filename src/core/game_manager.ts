import sleep from './sleep'
import PlayerUser from '~/core/domain/player_user'
import PlayerComputer from '~/core/domain/player_computer'
import GameController from '~/core/game_controller'
import { CardListEmptyException } from '~/core/domain/card_list'

const DEFAULT_HAND_COUNT = 5
const DRAW_COUNT_PER_TURN = 1

enum TurnPlayer {
  COMPUTER,
  USER,
}

class GameManager {
  playerComputer
  playerUser
  game_controller: GameController
  turnPlayer: TurnPlayer

  isStarted = false
  turnCount = 1

  showSnackBar = false
  snackBarText = ''

  constructor(playerComputer: PlayerComputer, playerUser: PlayerUser) {
    this.playerComputer = playerComputer
    this.playerUser = playerUser

    this.game_controller = new GameController(this)
    this.turnPlayer = TurnPlayer.USER
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

  game_loop() {
    try {
      const turnPlayer = this.getTurnPlayer()
      turnPlayer.draw(DRAW_COUNT_PER_TURN)
      turnPlayer.waitAction(this.game_controller)
    } catch (e) {
      if (e instanceof CardListEmptyException) {
        this.isStarted = false
      }
    }
  }

  async changeTurn() {
    this.showInfo('Change Turn')
    this.turnCount++
    this.turnPlayer =
      this.turnPlayer === TurnPlayer.COMPUTER
        ? TurnPlayer.USER
        : TurnPlayer.COMPUTER

    await sleep(2000)
    this.game_loop()
  }

  getTurnPlayer() {
    return this.turnPlayer === TurnPlayer.COMPUTER
      ? this.playerComputer
      : this.playerUser
  }

  showInfo(message: string) {
    this.showSnackBar = true
    this.snackBarText = message
  }
}

export default GameManager
