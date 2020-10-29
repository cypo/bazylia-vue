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

    &--highlighted {
      background-color:#20ce99;
      
      &:hover {
        background-color: #20ce99;
    }
    }
  }
  &__month {
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
