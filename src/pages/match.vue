<template>
  <div class="match">
    <div v-if="gameManager" class="match-field">
      <div class="status-info">
        <StatusInfo :player="gameManager.playerComputer" />
      </div>
      <div class="field">
        {{ gameManager.turnCount }}ターン目
        <CardList
          :cards="gameManager.playerComputer.field.cards"
          :show-action-button="false"
        />
        <div style="height: 20vh"></div>
        <div class="d-flex justify-center">
          <v-btn
            elevation="2"
            rounded
            :disabled="!gameManager.playerUser.showFinishActionButton"
            @click="gameManager.playerUser.finishActionButtonCallback"
          >
            <div>Change Turn</div>
          </v-btn>
        </div>
        <CardList
          :cards="gameManager.playerUser.field.cards"
          :card-state-callback="gameManager.attack"
        />
      </div>
      <div class="hand-info">
        <CardList
          :cards="gameManager.playerUser.hand.cards"
          :card-state-callback="gameManager.contract"
        />
      </div>
      <div class="status-info">
        <StatusInfo :player="gameManager.playerUser" />
      </div>
      <v-snackbar v-model="gameManager.showSnackBar" centered timeout="1000">
        {{ gameManager.snackBarText }}
      </v-snackbar>
    </div>
    <v-dialog v-model="startDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title> マッチを開始します。 </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="startMatch"> start </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import Deck from '~/core/domain/deck'
import GameManager from '~/core/game_manager'
import PlayerUser from '~/core/domain/player_user'
import PlayerComputer from '~/core/domain/player_computer'

// new Card(
//   'ini-XXX',
//   '侵略者',
//   '契約時: 自分プレイヤーに5ダメージ。\n相手の場の最も古いカードを破壊する。\n相手のターン開始時: 相手プレイヤーに3ダメージ。',
//   require('@/assets/images/cards/ini-001.png'),
//   7000,
//   5,
//   (card) => {
//     card.owner.life -= 5
//     try {
//       card.owner.opponentPlayer.field.popTopCard()
//     } catch (e) {}
//   },
//   () => {},
//   (card) => {
//     card.owner.opponentPlayer.life -= 3
//   }
// ),
const deckDataComputer = {
  'ini-001': 1,
  'ini-002': 1,
  'ini-003': 1,
  'ini-004': 37,
}
const deckDataPlayer = {
  'ini-001': 1,
  'ini-002': 1,
  'ini-003': 1,
  'ini-004': 37,
}

const setupGameManager = async () => {
  const cardsComputer = []
  for (const [code, count] of Object.entries(deckDataComputer)) {
    for (let i = 0; i < count; i++) {
      const cardModule = await import(`~/core/cards/${code}`)
      const CardClass = cardModule.default
      cardsComputer.push(new CardClass())
    }
  }
  const deckComputer = new Deck(cardsComputer)

  const cardsPlayer = []
  for (const [code, count] of Object.entries(deckDataPlayer)) {
    for (let i = 0; i < count; i++) {
      const cardModule = await import(`~/core/cards/${code}`)
      const CardClass = cardModule.default
      cardsPlayer.push(new CardClass())
    }
  }
  const deckPlayer = new Deck(cardsPlayer)

  const gameManager = new GameManager(
    new PlayerComputer(deckComputer),
    new PlayerUser(deckPlayer)
  )
  return gameManager
}

export default Vue.extend({
  name: 'MatchPage',
  data: () => {
    return {
      startDialog: true,
      gameManager: null,
    }
  },
  methods: {
    async startMatch() {
      this.gameManager = await setupGameManager()
      this.startDialog = false
      this.gameManager.start()
    },
  },
})
</script>

<style>
.status-info {
  height: 15vh;
  background-color: #3e3e3e;
}

.field {
  height: calc(55vh - 2 * 12px);
}

.hand-info {
  height: 15vh;
  background-color: #fbb;
}
</style>
