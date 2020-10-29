<template>
  <v-container elevation-0 row justify-center>
    <div my-4 class="white component-wrapper">
        <my-button fontColor="black" @click.native="goBack()" color="white"
          >Wstecz</my-button
        >
      <h1 class="rozliczenia__header">Rozliczenia > Medycyna pracy > {{rozliczenieMonth.miesiac }}</h1>
      <div class="rozliczenia">
        <ul>
          <li class="rozliczenia__element--header">
            <div>Nazwa firmy</div>
            <div>NIP</div>
            <div>status</div>

          </li>
          <li
            v-for="(firma) in rozliczenieMonth.firmy"
            :key="firma"
            class="rozliczenia__element"
            @click="goToFirma(firma.firmaId, rozliczenieMonth.miesiac)"
          >
            <div>{{ firma.nazwa }}</div>
            <div>{{ firma.nip }}</div>
            <div :class="
                    firma.settled ? 'rozliczono' : 'do-rozliczenia'
                  ">{{ firma.settled ? "Rozliczono" : "Do rozliczenia" }}</div>
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
    month: false,
    rozliczenieMonth: false,
    brakDanychMessage: false
  }),
  mounted: function() {
   const month = this.$route.params.month
    apiService.getRozliczenieByMonth(month).then(response => {
      this.$store.commit('GET_MONTH', response.data)
      this.rozliczenieMonth = this.$store.getters.getMonth
    })
  },
  methods: {
    goToFirma(firmaId, month) {
      console.log(month)
      this.$router.push({ path: `/rozliczenia/medycyna-pracy/${month}/firma/${firmaId}` })
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.do-rozliczenia {
  color: #f44336;
}
.rozliczono {
  color: #20ce99;
}
</style>
<style lang="scss" src='../scss/rozliczenia.scss'></style>
