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

  /**
   * 次ターンに得られる補助金の額を返す
   * @returns {number} 次ターンに得られる補助金の額
   */
  getNextTurnSubsidy(): number {
    const nextTurnCount = this.gameManager.turnCount + 2
    return this.gameManager.getSubsidy(nextTurnCount)
  }
}

export default GameController
