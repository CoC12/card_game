import Card from './card'
import CardList from './card_list'

/**
 * フィールドに関する情報を保持するクラス
 */
class Field extends CardList {
  limitCount = 5

  /**
   * 場のカードのコストの合計を返す
   * @returns {number} 場のカードのコストの合計
   */
  getTotalCardCost(): number {
    return this.cards.reduce(
      (total: number, card: Card) => total + card.cost,
      0
    )
  }
}

export default Field
