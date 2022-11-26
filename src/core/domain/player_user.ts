import assert from 'assert'
import sleep from '../sleep'
import Player from './player'
import Card from '~/core/domain/card'
import GameController from '~/core/game_controller'

type CardActionState = {
  label: string
  disabled: boolean
  actionCallback: (arg0: Card) => Promise<void>
}

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

  /**
   * カードダイアログの契約アクションの詳細情報を返す
   * @param {Card} card 契約するカード
   * @returns {{label: string, disabled: boolean, actionCallback: function(Card): Promise<void>}}
   */
  actionContract = (card: Card): CardActionState => {
    assert(card.owner?.contract)
    return {
      label: 'Contract',
      disabled: !card.owner.canContract(card),
      actionCallback: card.owner?.contract,
    }
  }

  /**
   * カードダイアログの攻撃アクションの詳細情報を返す
   * @param {Card} card 攻撃するカード
   * @returns {{label: string, disabled: boolean, actionCallback: function(Card): Promise<void>}}
   */
  actionAttack = (card: Card): CardActionState => {
    assert(card.owner?.attack)
    return {
      label: 'Attack',
      disabled: !card.owner.canAttack(card),
      actionCallback: card.owner?.attack,
    }
  }
}

export default PlayerUser
