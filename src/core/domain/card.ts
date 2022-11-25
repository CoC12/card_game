import Player from './player'

// eslint-disable-next-line no-use-before-define
type AdditionalDescriptionCallback = { (card: Card): string }
// eslint-disable-next-line no-use-before-define
type CardCallback = { (card: Card): Promise<void> }
// eslint-disable-next-line no-use-before-define
type LifeCallback = { (card: Card, life: number): number }
type CardDestroyedCallback = {
  // eslint-disable-next-line no-use-before-define
  (card: Card, destroyedCard: Card): Promise<void>
}

export type CardConstructor = {
  code: string
  name: string
  description: string
  additionalDescription?: AdditionalDescriptionCallback
  imgSrc: string
  cost: number
  attack: number
  onContracted?: CardCallback
  onAttacked?: CardCallback
  onDestroyed?: CardCallback
  onStartedOwnerTurn?: CardCallback
  onStartedOpponentTurn?: CardCallback
  onOwnerLifeDecreased?: LifeCallback
  onOwnerCardDestroyed?: CardDestroyedCallback
}

/**
 * カードに関する情報を保持するクラス
 */
class Card {
  id: string
  code: string
  name: string
  description: string
  additionalDescription: AdditionalDescriptionCallback
  imgSrc: string

  cost: number
  attack: number
  onContracted: CardCallback
  onAttacked: CardCallback
  onDestroyed: CardCallback
  onStartedOwnerTurn: CardCallback
  onStartedOpponentTurn: CardCallback
  onOwnerLifeDecreased: LifeCallback
  onOwnerCardDestroyed: CardDestroyedCallback

  isActed = true
  owner: Player | null = null

  /**
   * コンストラクタ
   * @param {CardConstructor} param0 カード情報
   */
  constructor({
    code,
    name,
    description,
    additionalDescription = (_) => '',
    imgSrc,
    cost,
    attack,
    onContracted = async () => {},
    onAttacked = async () => {},
    onDestroyed = async () => {},
    onStartedOwnerTurn = async () => {},
    onStartedOpponentTurn = async () => {},
    onOwnerLifeDecreased = (_, life) => life,
    onOwnerCardDestroyed = async () => {},
  }: CardConstructor) {
    this.id = this.generateId()
    this.code = code
    this.name = name
    this.description = description
    this.additionalDescription = additionalDescription
    this.imgSrc = imgSrc
    this.cost = cost
    this.attack = attack
    this.onContracted = onContracted
    this.onAttacked = onAttacked
    this.onDestroyed = onDestroyed
    this.onStartedOwnerTurn = onStartedOwnerTurn
    this.onStartedOpponentTurn = onStartedOpponentTurn
    this.onOwnerLifeDecreased = onOwnerLifeDecreased
    this.onOwnerCardDestroyed = onOwnerCardDestroyed
  }

  /**
   * カードのidを生成する
   * @returns {string} カードのid
   */
  generateId(): string {
    return Math.random().toString(32).substring(2)
  }

  /**
   * 所有プレイヤーを設定する。
   * @param {Player} owner 所有プレイヤー
   */
  setOwner(owner: Player): void {
    this.owner = owner
  }
}

export default Card
