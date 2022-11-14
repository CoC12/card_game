<template>
  <div class="hand">
    <div class="d-flex justify-center">
      <div v-for="card in cards" :key="card.id" class="card">
        <v-img
          contain
          :src="card.imgSrc"
          :aspect-ratio="59 / 86"
          width="13vw"
          height="13vh"
          @click="openDialog(card)"
        ></v-img>
      </div>
    </div>
    <v-dialog v-model="cardDialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>{{ clickedCard ? clickedCard.name : '' }}</v-card-title>
        <v-card-text class="card-dialog">
          <div>
            {{
              clickedCard
                ? `[ COST: ${clickedCard.cost.toLocaleString()} / ATK: ${
                    clickedCard.attack
                  } ]`
                : ''
            }}
          </div>
          <div>{{ clickedCard ? clickedCard.description : '' }}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="execAction">
            {{ actionLabel }}
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
    actionLabel: {
      type: String,
      required: true,
    },
    actionCallback: {
      type: Function,
      required: true,
    },
  },
  data: () => {
    return {
      cardDialog: false,
      clickedCard: null,
    }
  },
  methods: {
    openDialog(card) {
      this.cardDialog = true
      this.clickedCard = card
    },
    execAction() {
      this.cardDialog = false
      this.actionCallback(this.clickedCard)
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
</style>
