import Card from '~/core/domain/card'

class CardDetail extends Card {
  constructor() {
    super({
      code: 'ini-001',
      name: 'ミニゴブリン',
      description: '',
      imgSrc: require('@/assets/images/cards/ini-001.png'),
      cost: 500,
      attack: 1,
      onContracted: () => {},
      onStartedOwnerTurn: () => {},
      onStartedOpponentTurn: () => {},
    })
  }
}
export default CardDetail
