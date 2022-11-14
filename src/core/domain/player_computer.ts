import Player from './player'
import sleep from '~/core/sleep'
import GameController from '~/core/game_controller'

class PlayerComputer extends Player {
  async waitAction(gameController: GameController) {
    await sleep(2000)
    gameController.finish_action()
  }
}

export default PlayerComputer
