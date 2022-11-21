import assert from 'assert'
import Card, { CardConstructor } from '~/core/domain/card'
import cardsData from '~/core/cards/cards'

interface cardDataInterface {
  [key: string]: CardConstructor
}

const cardData: cardDataInterface = {
  'ini-001': {
    code: 'ini-001',
    name: 'ミニゴブリン',
    description: '',
    imgSrc: require('@/assets/images/cards/ini-001.png'),
    cost: 500,
    attack: 1,
  },
  'ini-002': {
    code: 'ini-002',
    name: 'ゴブリン',
    description: '契約時: 相手プレイヤーに1ダメージ。',
    imgSrc: require('@/assets/images/cards/ini-002.png'),
    cost: 1000,
    attack: 1,
    onContracted: (card: Card) => {
      assert(card.owner)
      assert(card.owner.opponentPlayer)
      card.owner.opponentPlayer.decreaseLife(1)
    },
  },
  'ini-003': {
    code: 'ini-003',
    name: 'ヒールエンジェル',
    description: '契約時: 自分プレイヤーを2回復。',
    imgSrc: require('@/assets/images/cards/ini-003.png'),
    cost: 1000,
    attack: 1,
    onContracted: (card: Card) => {
      assert(card.owner)
      card.owner.increaseLife(2)
    },
  },
  'ini-004': {
    code: 'ini-004',
    name: 'ガーディアン',
    description:
      '自分プレイヤーが1以上のダメージを受けるとき、そのダメージを-1し、このカードを破壊する。',
    imgSrc: require('@/assets/images/cards/ini-004.png'),
    cost: 1000,
    attack: 1,
    onOwnerLifeDecreased: (card: Card, life: number) => {
      if (life >= 1) {
        life -= 1
        card.owner?.destroy(card)
      }
      return life
    },
  },
  'ini-005': {
    code: 'ini-005',
    name: '神秘の祠',
    description:
      '自分の場のカードが破壊されたとき、それと同名のカード1枚を場に出して、このカードを破壊する。',
    imgSrc: require('@/assets/images/cards/ini-005.png'),
    cost: 2000,
    attack: 0,
    onOwnerCardDestroyed: (card: Card, destroyedCard: Card) => {
      assert(card.owner)
      const newCard = new Card(cardsData[destroyedCard.code])
      newCard.setOwner(card.owner)
      card.owner.field.addToLast(newCard)
      card.owner?.destroy(card)
    },
  },
  'ini-006': {
    code: 'ini-006',
    name: '魂の契約人',
    description:
      '自分のターン開始時: 自分の場の最もコストの高いカードを破壊する。\n相手のターン開始時: 相手の場の最もコストの低いカードを破壊する。',
    imgSrc: require('@/assets/images/cards/ini-006.png'),
    cost: 3000,
    attack: 1,
    onStartedOwnerTurn: (card: Card) => {
      if (!card.owner?.field.length()) {
        return
      }
      const targetCard = card.owner?.field.cards.reduce(
        (prevCard: Card, currentCard: Card) =>
          prevCard.cost > currentCard.cost ? prevCard : currentCard
      )
      card.owner?.destroy(targetCard)
    },
    onStartedOpponentTurn: (card: Card) => {
      if (!card.owner?.opponentPlayer?.field.length()) {
        return
      }
      const targetCard = card.owner?.opponentPlayer?.field.cards.reduce(
        (prevCard: Card, currentCard: Card) =>
          prevCard.cost < currentCard.cost ? prevCard : currentCard
      )
      card.owner?.opponentPlayer?.destroy(targetCard)
    },
  },
  'ini-007': {
    code: 'ini-007',
    name: '孤高の傀儡師',
    description:
      '攻撃時: 自分の場の最もコストの高いカードを破壊する。相手プレイヤーにXダメージ。Xは「破壊したカードの攻撃力の値」である。',
    imgSrc: require('@/assets/images/cards/ini-007.png'),
    cost: 3000,
    attack: 0,
    onAttacked: (card: Card) => {
      if (!card.owner?.field.length()) {
        return
      }
      const targetCard = card.owner?.field.cards.reduce(
        (prevCard: Card, currentCard: Card) =>
          prevCard.cost > currentCard.cost ? prevCard : currentCard
      )
      card.owner.destroy(targetCard)
      card.owner.opponentPlayer?.decreaseLife(targetCard.attack)
    },
  },
  'ini-008': {
    code: 'ini-008',
    name: '禁戒の研究者',
    description:
      '契約時: カードを1枚引く。\n破壊時: 自分のデッキからコスト$7,000以上のカードをランダムに1枚手札に加える。',
    imgSrc: require('@/assets/images/cards/ini-008.png'),
    cost: 4000,
    attack: 4,
    onContracted: (card: Card) => {
      card.owner?.draw(1)
    },
    onDestroyed: (card: Card) => {
      try {
        const targetCard = card.owner?.deck.popRandomCard(
          (card) => card.cost >= 7000
        )
        if (!targetCard) {
          return
        }
        card.owner?.hand.addToLast(targetCard)
      } catch (e) {}
    },
  },
  'ini-009': {
    code: 'ini-009',
    name: 'ゴブリンライダー',
    description: '破壊時: ゴブリン1枚を場に出す。',
    imgSrc: require('@/assets/images/cards/ini-009.png'),
    cost: 4000,
    attack: 4,
    onDestroyed: (card: Card) => {
      assert(card.owner)
      const goblinId = 'ini-002'
      const goblinCard = new Card(cardsData[goblinId])
      goblinCard.setOwner(card.owner)
      card.owner.field.addToLast(goblinCard)
    },
  },
  'ini-010': {
    code: 'ini-010',
    name: '業火の使い鳥',
    description: '破壊時: カードを2枚引く。',
    imgSrc: require('@/assets/images/cards/ini-010.png'),
    cost: 5000,
    attack: 5,
    onDestroyed: (card: Card) => {
      card.owner?.draw(2)
    },
  },
  'ini-011': {
    code: 'ini-011',
    name: '薬草売りの老婆',
    description: '破壊時: 自分のプレイヤーを5回復。',
    imgSrc: require('@/assets/images/cards/ini-011.png'),
    cost: 5000,
    attack: 2,
    onDestroyed: (card: Card) => {
      card.owner?.increaseLife(5)
    },
  },
  'ini-012': {
    code: 'ini-012',
    name: '沈黙の死神',
    description:
      '契約時: 相手プレイヤーにXダメージ。Xは「このゲーム中に破壊された自分のカードの数」である。',
    additionalDescription: (card: Card) =>
      `(Xは${card.owner?.destroyedCards.cards.length}）`,
    imgSrc: require('@/assets/images/cards/ini-012.png'),
    cost: 7000,
    attack: 6,
    onContracted: (card: Card) => {
      assert(card.owner)
      const destroyedCardsCount = card.owner.destroyedCards.length()
      card.owner.opponentPlayer?.decreaseLife(destroyedCardsCount)
    },
  },
}

export default cardData
