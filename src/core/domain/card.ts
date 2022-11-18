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

  constructor(args: {
    code: string
    name: string
    description: string
    imgSrc: string
    cost: number
    attack: number
    onContracted: Function
    onStartedOwnerTurn: Function
    onStartedOpponentTurn: Function
  }) {
    this.id = this.getId()
    this.code = args.code
    this.name = args.name
    this.description = args.description
    this.imgSrc = args.imgSrc
    this.cost = args.cost
    this.attack = args.attack
    this.onContracted = args.onContracted
    this.onStartedOwnerTurn = args.onStartedOwnerTurn
    this.onStartedOpponentTurn = args.onStartedOpponentTurn
  }

  getId() {
    return Math.random().toString(32).substring(2)
  }

  setOwner(owner: Player) {
    this.owner = owner
  }
}

export default Card
