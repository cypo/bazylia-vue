<template>
  <v-container elevation-0 row justify-center>
    <div my-4 class="white component-wrapper">
        <my-button fontColor="black" @click.native="goBack()" color="white" style="display: inline-block"
          >Wstecz</my-button
        >
        <my-button @click.native="dialog = true" color="success" style="display: inline-block">
           Wystaw fakturę
        </my-button>
      <h1 class="rozliczenia__header">Rozliczenia > Medycyna pracy > {{ this.$route.params.month }} > {{ rozliczeniaFirma.nazwaFirmy }} </h1>

      <div class="rozlcizenia">
        <ul>
          <li class="rozliczenia__element--header">
            <div style="width: 15%">Imię</div>
            <div style="width: 15%">Nazwisko</div>
            <div style="width: 40%">Usługa</div>
            <div style="width: 15%">Data wizyty</div>
            <div style="width: 15%">Dodaj do faktury</div>
          </li>
          <li
            v-for="(wizyta) in rozliczeniaFirma.wizyty"
            :key="wizyta"
            :class="{'rozliczenia__element--highlighted': (selected.includes(wizyta.wizytaId)), 'rozliczenia_element' : (!selected.includes(wizyta.wizytaId))}"
            class="rozliczenia__element"
            @click="select(wizyta)"
          >
            <div style="width: 15%">{{ wizyta.pacjent.imie }}</div>
            <div style="width: 15%">{{ wizyta.pacjent.nazwisko }}</div>
            <div style="width: 40%">{{ wizyta.usluga.nazwa }}</div>
            <div style="width: 15%">{{ new Date(wizyta.dataWizyty).toISOString().substr(0, 10) }}</div>
            <div style="width: 15%" v-if="!wizyta.faktura">Wybierz</div>
            <div style="width: 15%" v-if="wizyta.faktura">
              <router-link :to="`/faktury/${wizyta.faktura}`">Pokaż fakturę</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
     <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-3" primary-title
          >Wystawianie faktury</v-card-title
        >

        <v-container>
          <h3>Sposób płatności</h3>
          <v-radio-group v-model="sposobPlatnosciGroup">
            <v-radio
              v-for="item in sposobPlatnosci"
              :key="item"
              :label="`${item}`"
              :value="item"
            ></v-radio>
          </v-radio-group>
          <h3>Data wystawienia faktury</h3>
          <v-flex xs6>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <div class="form__input-wrapper">
                  <v-text-field
                    v-model="doZafakturowania.dataFaktury"
                    label="Wybierz datę"
                    data-cy="date-picker"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </div>
              </template>
              <v-date-picker
                v-model="doZafakturowania.dataFaktury"
                no-title
                locale="pl-PL"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>

          <h3>Data wykonania usługi:</h3>

          <div class="select-date">
            <v-flex xs6>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <div class="form__input-wrapper">
                    <v-text-field
                      v-model="doZafakturowania.dataSprzedazy"
                      label="Wybierz datę"
                      data-cy="date-picker"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </div>
                </template>
                <v-date-picker
                  v-model="doZafakturowania.dataSprzedazy"
                  no-title
                  locale="pl-PL"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-checkbox
              class="only-month-checkbox"
              v-model="doZafakturowania.tylkoMiesiac"
              label="Tylko miesiąc"
            ></v-checkbox>
          </div>

          <h3>Termin płatności:</h3>
          <v-radio-group v-model="terminPlatnosciGroup">
            <v-radio
              v-for="item in terminPlatnosci"
              :key="item"
              :label="`${item}`"
              :value="item"
            ></v-radio>
          </v-radio-group>
          <v-card-actions class="px-0 justify-center">
            <my-button
              color="white"
              fontColor="black"
              @click.native="dialog = false"
              >Anuluj</my-button
            >
            <my-button
              color="#20CE99"
              fontColor="white"
              @click.native="submitForInvoice(doZafakturowania)"
              >Wystaw Fakturę</my-button
            >
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import apiService from '@/services/apiService.js'

export default {
  data: () => ({
    isLoading: true,
    rozliczeniaFirma: false,
    brakDanychMessage: false,
    selected: [],
    selectAll: false,
    dialog: false,
    menu: false,
    menu2: false,
    terminPlatnosci: [7, 14, 30],
    terminPlatnosciGroup: '',
    sposobPlatnosci: ['GOTOWKA', 'PRZELEW'],
    sposobPlatnosciGroup: '',
    doZafakturowania: {
      wizyty: [],
      terminPlatnosci: '',
      sposobPlatnosci: '',
      dataFaktury: new Date().toISOString().substr(0, 10),
      dataSprzedazy: new Date().toISOString().substr(0, 10),
      tylkoMiesiac: false
    }
  }),
  mounted: function() {
   const firmaId = this.$route.params.firmaId
   const month = this.$route.params.month
    apiService.getRozliczenieByFirma(month, firmaId).then(response => {
      this.$store.commit('GET_ROZLICZENIA_FIRMA', response.data)
      this.rozliczeniaFirma = this.$store.getters.getRozliczeniaFirma
      console.log(this.$store.getters.getRozliczeniaFirma)
    })
  },
  updated: function() {
    this.doZafakturowania.terminPlatnosci = this.terminPlatnosciGroup
    this.doZafakturowania.sposobPlatnosci = this.sposobPlatnosciGroup
    this.doZafakturowania.rodzajDaty = this.rodzajDatyGroup
  },
  methods: {
    updateWizytyDoZafakturowania() {
      this.doZafakturowania.wizyty = this.selected
    },
    select(wizyta) {
      if(!this.selected.includes(wizyta.wizytaId) && !wizyta.faktura){
      this.selected.push(wizyta.wizytaId)
      }
      else if(this.selected.includes(wizyta.wizytaId)) {
        this.selected.remove(wizyta.wizytaId);
      }
      this.doZafakturowania.wizyty = this.selected
      if (this.selectAll) {
        rozliczenieFirma.wizyty.map(wizyta => {
              this.selected.push(wizyta.wizytaId)
              this.doZafakturowania.wizyty = this.selected
            })
      }
    },
    submitForInvoice(doZafakturowania) {
      apiService.submitForInvoice(doZafakturowania).then(response => {
        if (response.headers.location) {
          this.$router.push({ path: `${response.headers.location}` })
        } else {
          console.error('Cos nie tak z fakturami... przepraszamy.')
        }
      })
    },
    goBack() {
      this.$router.back()
    }
  }
}
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
</script>
<style lang="scss" src='../scss/rozliczenia.scss'></style>
