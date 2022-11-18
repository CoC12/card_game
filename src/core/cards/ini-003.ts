import assert from 'assert'
import Card from '~/core/domain/card'

class CardDetail extends Card {
  constructor() {
    super({
      code: 'ini-003',
      name: 'ヒールエンジェル',
      description: '契約時: 自分プレイヤーを2回復。',
      imgSrc: require('@/assets/images/cards/ini-003.png'),
      cost: 1000,
      attack: 1,
      onContracted: (card: Card) => {
        assert(card.owner)
        card.owner.life += 2
      },
      onStartedOwnerTurn: () => {},
      onStartedOpponentTurn: () => {},
    })
  }
}
export default CardDetail
