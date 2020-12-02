<template>
  <v-container elevation-0 row justify-center>
    <div my-4 class="white component-wrapper">
      <h1 class="rozliczenia__header">Rozliczenia - Specjalistyka</h1>
      <div class="rozliczenia">
        <ul>
          <li class="rozliczenia__element--header">
            <div>Nazwisko, imię</div>
            <div>PESEL</div>
            <div>status</div>
          </li>
          <li
            v-for="(pacjent) in rozliczenia.pacjenci"
            :key="pacjent"
            class="rozliczenia__element"
            @click="goToPacjent(pacjent.pacjentId)"
          >
            <div>{{ pacjent.nazwisko }} {{ pacjent.imie }}</div>
            <div>{{ pacjent.pesel }}</div>
            <div :class="
                    pacjent.settled ? 'rozliczono' : 'do-rozliczenia'
                  ">{{ pacjent.settled ? "Rozliczono" : "Do rozliczenia" }}</div>
          </li>
        </ul>
      </div>
    </div>
  </v-container>
</template>

<script>
import apiService from '@/services/apiService.js'

export default {
  data: () => ({
    isLoading: true,
    rozliczenia: false,
    brakDanychMessage: false
  }),
  mounted: function() {
    apiService.getRozliczenia('specjalistyka').then(response => {
      if (response.data) {
        this.$store.commit('GET_ALL_ROZLICZENIA_FROM_DB', response.data)
        this.rozliczenia = this.$store.getters.getAllRozliczenia
        this.isLoading = false
      } else {
        this.brakDanychMessage = 'Brak danych w bazie'
      }
    })
  },
  methods: {
    goToPacjent(pacjentId) {
      this.$router.push({ path: `/rozliczenia/specjalistyka/${pacjentId}` })
    }
  }
}
</script>
<style lang="scss" src='../scss/rozliczenia.scss'></style>
