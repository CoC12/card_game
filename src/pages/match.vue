<template>
  <div class="match">
    <div v-if="gameManager" class="match-field">
      <div class="status-info">
        <StatusInfo :player="gameManager.playerComputer" />
      </div>
      <div class="field">
        <div class="field-card">
          <CardList
            :cards="gameManager.playerComputer.field.cards"
            :show-action-button="false"
          />
        </div>
        <div class="match-info d-flex align-center">
          <v-col cols="3"> {{ gameManager.turnCount }}ターン目 </v-col>
          <v-col cols="6" class="d-flex justify-center">
            <v-btn
              elevation="2"
              rounded
              :disabled="!gameManager.playerUser.showFinishActionButton"
              @click="gameManager.playerUser.finishActionButtonCallback"
            >
              <div>Change Turn</div>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <!-- TODO Game Log -->
          </v-col>
        </div>
        <div class="field-card">
          <CardList
            :cards="gameManager.playerUser.field.cards"
            :card-state-callback="gameManager.playerUser.actionAttack"
          />
        </div>
      </div>
      <div class="hand-info">
        <CardList
          :cards="gameManager.playerUser.hand.cards"
          :card-state-callback="gameManager.playerUser.actionContract"
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
import Card from '~/core/domain/card'
import Deck from '~/core/domain/deck'
import GameManager from '~/core/game_manager'
import PlayerUser from '~/core/domain/player_user'
import PlayerComputer from '~/core/domain/player_computer'
import cardsData from '~/core/cards/cards'

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
const sampleDeck = {
  'ini-001': 3,
  'ini-002': 3,
  'ini-003': 3,
  'ini-004': 3,
  'ini-005': 3,
  'ini-006': 3,
  'ini-007': 3,
  'ini-008': 3,
  'ini-009': 3,
  'ini-010': 3,
  'ini-011': 3,
  'ini-012': 3,
}

const cardsComputer = []
for (const [code, count] of Object.entries(sampleDeck)) {
  for (let i = 0; i < count; i++) {
    const card = new Card(cardsData[code])
    cardsComputer.push(card)
  }
}

const cardsPlayer = []
for (const [code, count] of Object.entries(sampleDeck)) {
  for (let i = 0; i < count; i++) {
    const card = new Card(cardsData[code])
    cardsPlayer.push(card)
  }
}

const gameManager = new GameManager(
  new PlayerComputer(new Deck(cardsComputer)),
  new PlayerUser(new Deck(cardsPlayer))
)

export default Vue.extend({
  name: 'MatchPage',
  data: () => {
    return {
      startDialog: true,
      gameManager,
    }
  },
  methods: {
    /**
     * マッチを開始する。
     */
    startMatch() {
      this.startDialog = false
      this.gameManager.start()
    },
  },
})
</script>

<style>
:root {
  --card-area-height: 15vh;
}

.status-info {
  height: var(--card-area-height);
  background-color: #3e3e3e;
}

.field-card {
  height: var(--card-area-height);
}

.match-info {
  height: calc(100vh - 5 * var(--card-area-height) - 2 * 12px);
}

.hand-info {
  height: var(--card-area-height);
  background-color: #fbb;
}
</style>
