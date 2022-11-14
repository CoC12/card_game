<template>
  <v-container>
    <v-row>
      <v-col cols="4" class="red">
        <span class="text-h6"> $ {{ player.assets.toLocaleString() }} </span>
      </v-col>
      <v-col cols="4" class="blue text-center">
        <v-avatar color="orange" size="62">
          <span class="text-h5">{{ player.life }}</span>
        </v-avatar>
      </v-col>
      <v-col cols="4" class="red">
        <div class="hand-count">
          <v-icon left>mdi-cards-outline</v-icon>
          <span>{{ player.hand.length() }}</span>
        </div>
        <div class="deck-count">
          <v-icon left>mdi-card-multiple-outline</v-icon>
          <span>{{ player.deck.length() }}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import Player from '~/core/domain/player'

export default Vue.extend({
  props: {
    player: {
      type: Player,
      required: true,
    },
  },
})
</script>
