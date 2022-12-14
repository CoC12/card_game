<template>
  <div>
    <div class="d-flex justify-center">
      <div v-for="card in cards" :key="card.id" class="card">
        <v-img
          contain
          :src="card.imgSrc"
          :aspect-ratio="2 / 3"
          width="13vw"
          height="13vh"
          @click="openDialog(card)"
        ></v-img>
      </div>
    </div>
    <v-dialog
      v-if="clickedCard"
      v-model="cardDialog"
      scrollable
      max-width="300px"
    >
      <v-card>
        <v-card-title>{{ clickedCard.name }}</v-card-title>
        <v-card-text class="card-dialog">
          <div>
            {{
              `[ COST: $${clickedCard.cost.toLocaleString()} / ATK: ${
                clickedCard.attack
              } ]`
            }}
          </div>
          <div class="card-dialog-description">
            {{ clickedCard.description }}
            {{ clickedCard.additionalDescription(clickedCard) }}
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            v-if="showActionButton"
            color="blue darken-1"
            text
            :disabled="cardState().disabled"
            @click="execAction"
          >
            {{ cardState().label }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cardDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import Card from '~/core/domain/card'

export default Vue.extend({
  props: {
    cards: {
      type: Array[Card],
      required: true,
    },
    cardStateCallback: {
      type: Function,
      default: () => {},
    },
    showActionButton: {
      type: Boolean,
      default: true,
    },
  },
  data: () => {
    return {
      cardDialog: false,
      clickedCard: null,
    }
  },
  methods: {
    /**
     * 指定したカードのダイアログを表示する。
     * @param {Card} card ダイアログに表示するカード
     */
    openDialog(card) {
      this.cardDialog = true
      this.clickedCard = card
    },
    /**
     * ダイアログのボタンを押下した際のコールバック処理。
     */
    execAction() {
      this.cardDialog = false
      this.cardState().actionCallback(this.clickedCard)
    },
    /**
     * カードの状態を返す。
     */
    cardState() {
      return this.cardStateCallback(this.clickedCard)
    },
  },
})
</script>

<style>
.card {
  max-width: 13%;
  padding: 5px;
}

.card-dialog {
  height: 300px;
}

.card-dialog-description {
  white-space: pre-line;
}
</style>
