import Player from './player'

class Card {
  id: string
  code: string
  name: string
  description: string
  imgSrc: string

  cost: number
  attack: number

  isActed = true
  owner: Player | null = null

  constructor(
    code: string,
    name: string,
    description: string,
    imgSrc: string,
    cost: number,
    attack: number
  ) {
    this.id = this.getId()
    this.code = code
    this.name = name
    this.description = description
    this.imgSrc = imgSrc
    this.cost = cost
    this.attack = attack
  }

  getId() {
    return Math.random().toString(32).substring(2)
  }

  setOwner(owner: Player) {
    this.owner = owner
  }
}

export default Card
