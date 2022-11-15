class Card {
  id: string
  code: string
  name: string
  description: string
  imgSrc: string

  cost: number
  attack: number

  isActed = true

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
}

export default Card
