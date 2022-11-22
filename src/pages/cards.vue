<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <v-card class="text-center">
        <v-card-title class="headline">
          <div class="d-flex justify-center">Card List</div>
        </v-card-title>
        <v-card-text name="card-info-body">
          <v-row no-gutters>
            <v-col v-for="card in cards" :key="card.id" cols="12" md="6">
              <v-container>
                <v-row @click="openDialog(card)">
                  <v-col cols="4">
                    <v-img
                      contain
                      :src="card.imgSrc"
                      :aspect-ratio="2 / 3"
                      width="100%"
                      height="100%"
                      position="top"
                    ></v-img>
                  </v-col>
                  <v-col cols="8">
                    <div class="text-left">
                      {{ card.name }}
                    </div>
                    <div class="text-left caption mt-2">
                      {{
                        `[ COST: $${card.cost.toLocaleString()} / ATK: ${
                          card.attack
                        } ]`
                      }}
                    </div>
                    <div class="card-dialog-description text-left caption">
                      {{ card.description }}
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
          <v-dialog
            v-if="clickedCard"
            v-model="cardDialog"
            scrollable
            max-width="60vh"
          >
            <v-card>
              <v-card-title>{{ clickedCard.name }}</v-card-title>
              <v-card-text>
                <v-img
                  contain
                  :src="clickedCard.imgSrc"
                  :aspect-ratio="2 / 3"
                  width="60vh"
                  height="100%"
                  position="top"
                ></v-img>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cardDialog = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text href="/"> Back </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'
import Card from '~/core/domain/card'
import cardsData from '~/core/cards/cards'

export default Vue.extend({
  name: 'CardList',
  data: () => {
    return {
      cardDialog: false,
      clickedCard: null,
      cards: Object.values(cardsData).map((card) => new Card(card)),
    }
  },
  methods: {
    openDialog(card) {
      this.cardDialog = true
      this.clickedCard = card
    },
  },
})
</script>

<style>
.card-dialog-description {
  white-space: pre-line;
}
</style>
