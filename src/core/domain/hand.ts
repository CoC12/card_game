import CardList from './card_list'

class Hand extends CardList {
  limit_count = 6

  constructor() {
    super([])
  }
}

export default Hand
