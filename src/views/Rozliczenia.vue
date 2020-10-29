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
<<<<<<< HEAD
            <template v-slot:header>
              <ul class="patient__header">
                <li>{{ rozliczenie.firma.nazwa }}</li>
                <li
                  class="patient__details-element"
                  :class="
                    rozliczenie.incomplete ? 'do-rozliczenia' : 'rozliczono'
                  "
                >
                  {{ rozliczenie.incomplete ? 'Do rozliczenia' : 'Rozliczono' }}
                </li>
              </ul>
            </template>
            <v-card>
              <div v-if="rozliczenie.incomplete" class="btns-wrapper">
                <my-button @click.native="dialog = true" color="success">
                  Wystaw fakturę
                </my-button>
                <div class="select-all-checkbox">
                  <v-checkbox
                    v-model="selectAll"
                    :label="`Zaznacz wszystkie`"
                    @change="select(rozliczenie)"
                  ></v-checkbox>
                </div>
              </div>
              <ul>
                <li
                  v-for="miesiac in rozliczenie.miesiace"
                  :key="miesiac.miesiac"
                >
                  <h3>{{ miesiac.miesiac }}</h3>
                  <ul>
                    <li
                      class="patient__list-element"
                      v-for="(pacjent, i) in miesiac.pacjenci"
                      :key="i"
                    >
                      <div>
                        {{ pacjent.pacjent.imie }}
                        {{ pacjent.pacjent.nazwisko }}
                      </div>

                      <ul class="patient__service">
                        <li v-for="(wizyta, i) in pacjent.wizyty" :key="i">
                          <div class="patient__service-desc">
                            <span
                              >{{ wizyta.dataWizyty | moment('MM-DD-YYYY') }}
                            </span>
                            &nbsp; - &nbsp;
                            <span> {{ wizyta.usluga.nazwa }}</span>
                          </div>
                          <div v-if="!wizyta.faktura" class="patient__checkbox">
                            <v-checkbox
                              v-model="selected"
                              :value="wizyta.wizytaId"
                              :label="'Zaznacz'"
                              @change="updateWizytyDoZafakturowania"
                            ></v-checkbox>
                          </div>

                          <div
                            v-if="wizyta.faktura"
                            class="patient__show-invoice"
                          >
                            <router-link :to="`/faktury/${wizyta.faktura}`"
                              >Pokaż fakturę</router-link
                            >
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li></li>
              </ul>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-text>
      <v-card-text v-if="brakDanychMessage">{{
        brakDanychMessage
      }}</v-card-text>
=======
            <div>{{ miesiac }}</div>
          </li>
        </ul>
      </div>
>>>>>>> rozliczenia medycyna-pracy view changed to table
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
<<<<<<< HEAD
    updateWizytyDoZafakturowania() {
      this.doZafakturowania.wizyty = this.selected
    },
    select(rozliczenie) {
      this.selected = []
      this.doZafakturowania.wizyty = []
      if (this.selectAll) {
        rozliczenie.miesiace.map(miesiac => {
          miesiac.pacjenci.map(pacjent => {
            pacjent.wizyty.map(wizyta => {
              if (!wizyta.faktura) {
                this.selected.push(wizyta.wizytaId)
                this.doZafakturowania.wizyty = this.selected
              }
            })
          })
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
=======
    goToMonth(month) {
      this.$router.push({ path: `/rozliczenia/medycyna-pracy/${month}` })
>>>>>>> rozliczenia medycyna-pracy view changed to table
    }
  }
}
</script>

<style lang="scss">
.rozliczenia {
  &__header {
    padding: 20px 0px;
  }
  &__element--header,
  &__element {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid darkgrey;
    cursor: pointer;
    transition: background-color 0.2s ease;
    div {
      width: 25%;
      &:last-of-type {
        text-align: right;
      }
    }

    &:hover {
      background-color: #eee;
    }

    &--header {
      font-weight: bold;
    }

<<<<<<< HEAD
.patient {
  &__show-invoice {
    display: flex;
    align-items: flex-end;
    margin-bottom: -5px;
  }
  &__checkbox {
    margin-right: -10px;
  }
}
.select-all-checkbox {
  margin-right: -10px;
}

.v-input {
  &__slot {
=======
    &--highlighted {
      background-color:#20ce99;
      
      &:hover {
        background-color: #20ce99;
    }
    }
  }
  &__month {
>>>>>>> rozliczenia medycyna-pracy view changed to table
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid darkgrey;
    cursor: pointer;
    transition: background-color 0.2s ease;
    div {
      width: 5%;
      &:last-of-type {
        text-align: right;
      }
    }

    &:hover {
      background-color: #eee;
    }

    &--header {
      font-weight: bold;
    }

    &--highlighted {
      background-color:#20ce99;
      
      &:hover {
        background-color: #20ce99;
    }
    }
  }
}

.do-rozliczenia {
  color: #f44336;
}

.rozliczono {
  color: #20ce99;
}
</style>
