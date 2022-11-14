import GameManager from '~/core/game_manager'

class GameController {
  gameManager: GameManager

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager
  }

  finish_action() {
    this.gameManager.changeTurn()
  }
}

export default GameController
