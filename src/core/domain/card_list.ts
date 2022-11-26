import Card from './card'
import sleep from '~/core/sleep'

/**
 * カードリストが空のときに要素を取得した際に発生する例外。
 */
export class CardListEmptyException extends Error {}
/**
 * カードリストに指定したカードが存在しなかったときに発生する例外。
 */
export class CardDoesNotExistsException extends Error {}

/**
 * カードリストに関する情報を保持するクラス
 */
class CardList {
  cards: Card[]
  limitCount = -1

  /**
   * コンストラクタ
   * @param {Card[]} [cards=[]] カードの配列
   */
  constructor(cards: Card[] = []) {
    this.cards = cards
  }

  /**
   * カードの枚数を返す。
   * @returns {number} カードの枚数
   */
  length(): number {
    return this.cards.length
  }

  /**
   * カードリストに空きがあるかを返す
   * @returns {boolean} カードリストに空きがあるか
   */
  hasSpace(): boolean {
    if (this.limitCount < 0) {
      return true
    }
    return this.cards.length < this.limitCount
  }

  /**
   * カードidを指定してカードを取り除く。
   * @param {string} id カードid
   * @returns {Card} 取り除いたカード
   * @throws {CardDoesNotExistsException} 指定したカードが存在しなかった場合
   */
  popCardById(id: string): Card {
    const card = this.cards.find((card) => card.id === id)
    if (!card) {
      throw new CardDoesNotExistsException()
    }
    this.cards = this.cards.filter((card) => card.id !== id)
    return card
  }

  /**
   * カードリストの先頭のカードを取り除く。
   * @returns {Card} 取り除いたカード
   * @throws {CardListEmptyException} カードリストが空の場合
   */
  popTopCard(): Card {
    const card = this.cards.shift()
    if (card == null) {
      throw new CardListEmptyException()
    }
    return card
  }

  /**
   * カードリストの最後のカードを取り除く。
   * @returns {Card} 取り除いたカード
   * @throws {CardListEmptyException} カードリストが空の場合
   */
  popLastCard(): Card {
    const card = this.cards.pop()
    if (card == null) {
      throw new CardListEmptyException()
    }
    return card
  }

  /**
   * 指定した条件を満たすカードをランダムに取得する。
   * @param {function(Card): boolean} [condition=(_: Card) => true] カードリストを絞り込む条件
   * @returns {Card} 選ばれたカード
   * @throws {CardDoesNotExistsException} 指定した条件のカードが存在しなかった場合
   */
  popRandomCard(condition: (arg0: Card) => boolean = (_: Card) => true): Card {
    const targetCards = this.cards.filter(condition)
    if (targetCards.length === 0) {
      throw new CardDoesNotExistsException()
    }
    const targetIndex = Math.floor(Math.random() * targetCards.length)
    return this.popCardById(targetCards[targetIndex].id)
  }

  /**
   * 指定したカードを配列の最後尾に追加する。
   * カードリストの最大枚数に達した場合は追加したカードを削除する。
   * @param {Card} card 追加するカード
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async addToLast(card: Card): Promise<void> {
    this.cards.push(card)
    await sleep(300)
    this.validate()
  }

  /**
   * カードリストをシャッフルする。
   */
  shuffle(): void {
    for (let i = this.cards.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }

  /**
   * カードリストの最大枚数を検証する。
   * カードリストの最大枚数を超えた場合は最後のカードを削除する。
   */
  validate(): void {
    if (this.limitCount < 0) {
      return
    }
    if (this.limitCount < this.cards.length) {
      this.popLastCard()
    }
  }
}

export default CardList
