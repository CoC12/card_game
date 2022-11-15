import CardList from './card_list'

class Hand extends CardList {
  limitCount = 6

  constructor() {
    super([])
  }
}

export default Hand
