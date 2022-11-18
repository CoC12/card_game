import Card from '~/core/domain/card'

class CardDetail extends Card {
  constructor() {
    super({
      code: 'ini-004',
      name: 'ガーディアン',
      description:
        '自分プレイヤーが1以上のダメージを受けるとき、そのダメージを-1し、このカードを破壊する。',
      imgSrc: require('@/assets/images/cards/ini-004.png'),
      cost: 1000,
      attack: 1,
      onContracted: () => {},
      onStartedOwnerTurn: () => {},
      onStartedOpponentTurn: () => {},
    })
  }
}
export default CardDetail
