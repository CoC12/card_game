import Card from './card'
import Player from './player'
import sleep from '~/core/sleep'

/**
 * コンピューターによる行動を管理するクラス
 */
class PlayerComputer extends Player {
  /**
   * コンピューターの行動を定義する
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async waitAction(): Promise<void> {
    await sleep(2000)

    // 選択可能な行動をすべて実行する
    actionLoop: while (true) {
      // 契約すべきカードは場に出す。
      for (const card of this.hand.cards) {
        if (this.computerActionCanContract(card)) {
          await this.contract(card)
          continue actionLoop
        }
      }
      // 攻撃可能なカードは場に出す。
      for (const card of this.field.cards) {
        if (this.computerActionCanAttack(card)) {
          await this.attack(card)
          continue actionLoop
        }
      }
      break
    }

    this.gameController?.finish_action()
  }

  /**
   * 指定したカードが契約可能かを返す
   * @param {Card} card 対象のカード
   * @returns {boolean} 契約可能か
   */
  computerActionCanContract(card: Card): boolean {
    if (card.owner !== this) {
      return false
    }
    if (!this.canContract(card)) {
      return false
    }
    if (!this.gameController) {
      return false
    }
    // 契約に使用できるコストの上限 =
    //    (現在の資産 + 次ターンに得られる補助金 - フィールドのコストの合計) / 2
    const nextTurnSubsidy = this.gameController.getNextTurnSubsidy()
    const totalFieldCost = this.field.getTotalCardCost()
    const costLimit = (this.assets + nextTurnSubsidy - totalFieldCost) / 2
    return card.cost <= costLimit
  }

  /**
   * 指定したカードが攻撃可能かを返す
   * @param {Card} card 対象のカード
   * @returns {boolean} 攻撃可能か
   */
  computerActionCanAttack(card: Card): boolean {
    return this.canAttack(card)
  }
}

export default PlayerComputer
