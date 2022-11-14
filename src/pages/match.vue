<template>
  <div class="match">
    <div class="status-info">
      <StatusInfo :player="gameManager.playerComputer" />
    </div>
    <div class="field">
      {{ gameManager.turnCount }}ターン目
      <CardList
        :cards="gameManager.playerComputer.field.cards"
        action-label="XXXXX"
        :action-callback="() => {}"
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
        action-label="Attack"
        :action-callback="() => {}"
      />
    </div>
    <div class="hand-info">
      <CardList
        :cards="gameManager.playerUser.hand.cards"
        action-label="Employ"
        :action-callback="gameManager.employ"
      />
    </div>
    <div class="status-info">
      <StatusInfo :player="gameManager.playerUser" />
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
    <v-snackbar v-model="gameManager.showSnackBar" centered timeout="1000">
      {{ gameManager.snackBarText }}
    </v-snackbar>
  </div>
</template>

<script>
import Vue from 'vue'
import Card from '~/core/domain/card'
import Deck from '~/core/domain/deck'
import GameManager from '~/core/game_manager'
import PlayerUser from '~/core/domain/player_user'
import PlayerComputer from '~/core/domain/player_computer'

const gameManager = new GameManager(
  new PlayerComputer(
    new Deck(
      [...Array(40).keys()].map((_) => {
        return new Card(
          'test',
          'test',
          'test',
          'https://m.media-amazon.com/images/I/61rjYa6-ceL._AC_.jpg',
          500,
          2
        )
      })
    )
  ),
  new PlayerUser(
    new Deck(
      [...Array(40).keys()].map((d) => {
        return new Card(
          'ini-001',
          'ミニゴブリン' + d,
          '出撃時: 相手プレイヤーに1ダメージ。',
          'https://m.media-amazon.com/images/I/61rjYa6-ceL._AC_.jpg',
          500,
          1
        )
      })
    )
  )
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
    startMatch() {
      this.startDialog = false
      gameManager.start()
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
