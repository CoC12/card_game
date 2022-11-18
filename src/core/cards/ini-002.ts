import assert from 'assert'
import Card from '~/core/domain/card'

class CardDetail extends Card {
  constructor() {
    super({
      code: 'ini-002',
      name: 'ゴブリン',
      description: '契約時: 相手プレイヤーに1ダメージ。',
      imgSrc: require('@/assets/images/cards/ini-002.png'),
      cost: 1000,
      attack: 1,
      onContracted: (card: Card) => {
        assert(card.owner)
        assert(card.owner.opponentPlayer)
        card.owner.opponentPlayer.life -= 1
      },
      onStartedOwnerTurn: () => {},
      onStartedOpponentTurn: () => {},
    })
  }
}
export default CardDetail
