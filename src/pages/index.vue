<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="text-center">
        <v-card-title class="headline">
          <div class="d-flex justify-center">Top Page</div>
        </v-card-title>
        <v-card-text>
          <div>
            <v-btn class="my-4" color="primary" href="match/">
              Start Match
            </v-btn>
          </div>
          <div>
            <v-btn class="my-4" color="primary" href="cards/">
              Card List
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
