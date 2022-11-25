import GameManager from '~/core/game_manager'

/**
 * gameManagerクラスを外部から操作するためのクラス
 */
class GameController {
  gameManager: GameManager

  /**
   * コンストラクタ
   * @param {GameManager} gameManager GameManagerオブジェクト
   */
  constructor(gameManager: GameManager) {
    this.gameManager = gameManager
  }

  /**
   * 行動を終了する
   */
  finish_action(): void {
    this.gameManager.changeTurn()
  }
}

export default GameController
