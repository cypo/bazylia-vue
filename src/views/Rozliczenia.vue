<template>
  <v-container elevation-0 row justify-center>
    <div my-4 class="white component-wrapper">
      <h1 class="rozliczenia__header">Rozliczenia - Medycyna pracy</h1>
      <div class="rozliczenia">
        <ul>
          <li class="rozliczenia__month--header">
            <div>Wybierz miesiąc</div>
          </li>
          <li
            v-for="(miesiac) in rozliczenia.miesiace"
            :key="miesiac"
            class="rozliczenia__month"
            @click="goToMonth(miesiac)"
          >
            <div>{{ miesiac }}</div>
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
    apiService.getRozliczenia('medycyna-pracy').then(response => {
      console.log(response.data);
      if (response.data) {
        this.$store.commit('GET_ALL_ROZLICZENIA_FROM_DB', response.data)
        this.rozliczenia = this.$store.getters.getAllRozliczenia
        this.rozliczenia = this.rozliczenia.map(rozliczenie => {
          let incomplete = false
          rozliczenie.miesiace.map(miesiac => {
            miesiac.pacjenci.map(pacjent => {
              pacjent.wizyty.map(wizyta => {
                if (!wizyta.faktura) {
                  incomplete = true
                }
              })
            })
          })
          return {
            ...rozliczenie,
            incomplete
          }
        })

        this.isLoading = false
      } else {
        this.brakDanychMessage = 'Brak danych w bazie'
      }
    })
  },
  methods: {
    goToMonth(month) {
      this.$router.push({ path: `/rozliczenia/medycyna-pracy/${month}` })
    }
  }
}
</script>

<style lang="scss" src='../scss/rozliczenia.scss'></style>
