import Player from './player'
import sleep from '~/core/sleep'
import GameController from '~/core/game_controller'

/**
 * コンピューターによる行動を管理するクラス
 */
class PlayerComputer extends Player {
  /**
   * コンピューターの行動を定義する
   * @param {GameController} gameController GameControllerオブジェクト
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async waitAction(gameController: GameController): Promise<void> {
    await sleep(2000)
    gameController.finish_action()
  }
}

export default PlayerComputer
