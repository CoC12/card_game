import Player from './player'

// eslint-disable-next-line no-use-before-define
type AdditionalDescriptionCallback = { (card: Card): string }
// eslint-disable-next-line no-use-before-define
type CardCallback = { (card: Card): void }
// eslint-disable-next-line no-use-before-define
type LifeCallback = { (card: Card, life: number): number }
// eslint-disable-next-line no-use-before-define
type CardDestroyedCallback = { (card: Card, destroyedCard: Card): void }

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

  constructor({
    code,
    name,
    description,
    additionalDescription = (_) => '',
    imgSrc,
    cost,
    attack,
    onContracted = () => {},
    onAttacked = () => {},
    onDestroyed = () => {},
    onStartedOwnerTurn = () => {},
    onStartedOpponentTurn = () => {},
    onOwnerLifeDecreased = (_, life) => life,
    onOwnerCardDestroyed = () => {},
  }: CardConstructor) {
    this.id = this.getId()
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

  getId() {
    return Math.random().toString(32).substring(2)
  }

  setOwner(owner: Player) {
    this.owner = owner
  }
}

export default Card
