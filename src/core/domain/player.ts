import assert from 'assert'
import Deck from './deck'
import Hand from './hand'
import Field from './field'
import DestroyedCards from './destroyed_cards'
import Card from './card'
import sleep from '~/core/sleep'
import GameController from '~/core/game_controller'

/**
 * プレイヤーによる行動を管理するクラス
 */
class Player {
  assets = 1000
  life = 20

  deck: Deck
  hand: Hand
  field: Field
  destroyedCards: DestroyedCards
  // eslint-disable-next-line no-use-before-define
  opponentPlayer: Player | null = null

  canAct = false

  /**
   * コンストラクタ
   * @param {Deck} deck プレーヤーのデッキ
   */
  constructor(deck: Deck) {
    this.deck = deck
    this.hand = new Hand()
    this.field = new Field()
    this.destroyedCards = new DestroyedCards()
    this.deck.cards.forEach((card) => {
      card.setOwner(this)
    })
  }

  /**
   * 相手プレイヤーを設定する
   * @param {Player} opponentPlayer 相手プレイヤー
   */
  setOpponentPlayer(opponentPlayer: Player): void {
    this.opponentPlayer = opponentPlayer
  }

  /**
   * プレイヤーの行動を待機する
   * @param {GameController} _ GameControllerオブジェクト
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async waitAction(_: GameController): Promise<void> {}

  /**
   * プレイヤーの資産を増やす
   * @param {number} assets 増やす資産
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async increaseAssets(assets: number): Promise<void> {
    this.assets += assets
    await sleep(300)
  }

  /**
   * プレイヤーの資産を減らす
   * @param {number} assets 減らす資産
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async decreaseAssets(assets: number): Promise<void> {
    this.assets -= assets
    await sleep(300)
  }

  /**
   * プレイヤーの体力を増やす
   * @param {number} life 増やす体力
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async increaseLife(life: number): Promise<void> {
    this.life += life
    await sleep(300)
  }

  /**
   * プレイヤーの体力を減らす
   * @param {number} life 減らす体力
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async decreaseLife(life: number): Promise<void> {
    for (const card of this.field.cards) {
      life = await card.onOwnerLifeDecreased(card, life)
    }
    this.life -= life
    await sleep(300)
  }

  /**
   * デッキからカードを引く
   * @param {number} count 引くカードの枚数
   */
  async draw(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      const card = this.deck.popTopCard()
      await this.hand.addToLast(card)
    }
  }

  /**
   * 場のカードのコストを支払う
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async payFieldCardCost(): Promise<void> {
    for (const card of this.field.cards) {
      await this.decreaseAssets(card.cost)
    }
  }

  /**
   * 指定したカードが契約可能かを返す
   * @param {Card} card 対象のカード
   * @returns {boolean} 指定のカードを契約できるか
   */
  canContract(card: Card): boolean {
    // ターンプレイヤーではない場合は不可
    if (!card.owner?.canAct) {
      return false
    }
    // カード所有者のフィールドに空きがなければ不可
    if (!card.owner?.field.hasSpace()) {
      return false
    }
    // カードのコストがプレイヤーの資産を超えている場合は不可
    return card.cost <= this.assets
  }

  /**
   * 指定したカードが攻撃可能かを返す
   * @param {Card} card 対象のカード
   * @returns {boolean} 指定のカードを攻撃できるか
   */
  canAttack(card: Card): boolean {
    // ターンプレイヤーではない場合は不可
    if (!card.owner?.canAct) {
      return false
    }
    return !card.isActed
  }

  /**
   * 指定した手札のカードを場に出す
   * @param {Card} card 契約するカード
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async contract(card: Card): Promise<void> {
    // コストの支払い
    await card.owner?.decreaseAssets(card.cost)
    // 手札のカードを場に移動
    card.owner?.hand.popCardById(card.id)
    await card.owner?.field.addToLast(card)
    // 契約時処理を実行
    await card.onContracted(card)
  }

  /**
   * 指定した場のカードが攻撃する
   * @param {Card} card 攻撃するカード
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async attack(card: Card): Promise<void> {
    await card.owner?.opponentPlayer?.decreaseLife(card.attack)
    card.isActed = true
    await card.onAttacked(card)
  }

  /**
   * 指定した場のカードを破壊する
   * @param destroyedCard 破壊するカード
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async destroy(destroyedCard: Card): Promise<void> {
    // 場のカードを破壊カードリストに移動
    destroyedCard.owner?.field.popCardById(destroyedCard.id)
    await destroyedCard.owner?.destroyedCards.addToLast(destroyedCard)
    // 破壊時処理を実行
    await destroyedCard.onDestroyed(destroyedCard)
    // 場の他カード破壊時処理を実行
    assert(destroyedCard.owner)
    for (const card of destroyedCard.owner.field.cards) {
      await card.onOwnerCardDestroyed(card, destroyedCard)
    }
  }
}

export default Player
