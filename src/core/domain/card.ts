import Player from './player'

class Card {
  id: string
  code: string
  name: string
  description: string
  imgSrc: string

  cost: number
  attack: number
  onContracted: Function
  onStartedOwnerTurn: Function
  onStartedOpponentTurn: Function

  isActed = true
  owner: Player | null = null

  constructor(
    code: string,
    name: string,
    description: string,
    imgSrc: string,
    cost: number,
    attack: number,
    onContracted = () => {},
    onStartedOwnerTurn = () => {},
    onStartedOpponentTurn = () => {}
  ) {
    this.id = this.getId()
    this.code = code
    this.name = name
    this.description = description
    this.imgSrc = imgSrc
    this.cost = cost
    this.attack = attack
    this.onContracted = onContracted
    this.onStartedOwnerTurn = onStartedOwnerTurn
    this.onStartedOpponentTurn = onStartedOpponentTurn
  }

  getId() {
    return Math.random().toString(32).substring(2)
  }

  setOwner(owner: Player) {
    this.owner = owner
  }
}

export default Card
