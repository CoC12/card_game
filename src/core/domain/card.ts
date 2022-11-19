import Player from './player'

// eslint-disable-next-line no-use-before-define
type AdditionalDescriptionCallback = { (card: Card): string }
// eslint-disable-next-line no-use-before-define
type CardCallback = { (card: Card): void }
// eslint-disable-next-line no-use-before-define
type LifeCallback = { (card: Card, life: number): number }

type CardConstructor = {
  code: string
  name: string
  description: string
  additionalDescription: AdditionalDescriptionCallback
  imgSrc: string
  cost: number
  attack: number
  onContracted?: CardCallback
  onDestroyed?: CardCallback
  onStartedOwnerTurn?: CardCallback
  onStartedOpponentTurn?: CardCallback
  onOwnerLifeDecreased?: LifeCallback
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
  onDestroyed: CardCallback
  onStartedOwnerTurn: CardCallback
  onStartedOpponentTurn: CardCallback
  onOwnerLifeDecreased: LifeCallback

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
    onDestroyed = () => {},
    onStartedOwnerTurn = () => {},
    onStartedOpponentTurn = () => {},
    onOwnerLifeDecreased = (_, life) => life,
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
    this.onDestroyed = onDestroyed
    this.onStartedOwnerTurn = onStartedOwnerTurn
    this.onStartedOpponentTurn = onStartedOpponentTurn
    this.onOwnerLifeDecreased = onOwnerLifeDecreased
  }

  getId() {
    return Math.random().toString(32).substring(2)
  }

  setOwner(owner: Player) {
    this.owner = owner
  }
}

export default Card
