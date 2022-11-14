import Player from './player'
import GameController from '~/core/game_controller'

class PlayerUser extends Player {
  showFinishActionButton = false
  finishActionButtonCallback = () => {}

  waitAction(gameController: GameController) {
    this.showFinishActionButton = true
    this.finishActionButtonCallback = () => {
      this.showFinishActionButton = false
      gameController.finish_action()
    }
  }
}

export default PlayerUser
