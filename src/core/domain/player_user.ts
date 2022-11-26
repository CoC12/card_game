import sleep from '../sleep'
import Player from './player'
import GameController from '~/core/game_controller'

/**
 * プレイヤーによる行動を管理するクラス
 */
class PlayerUser extends Player {
  showFinishActionButton = false
  finishActionButtonCallback = () => {}

  /**
   * プレイヤーの行動を待機する
   * @param {GameController} gameController GameControllerオブジェクト
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async waitAction(gameController: GameController): Promise<void> {
    await sleep(0)
    this.showFinishActionButton = true
    this.finishActionButtonCallback = () => {
      this.showFinishActionButton = false
      gameController.finish_action()
    }
  }
}

export default PlayerUser
