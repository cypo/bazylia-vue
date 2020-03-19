import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    patients: [],
    wizyta: {
      pacjent: {
        pacjentId: '',
        imie: '',
        nazwisko: '',
        pesel: '',
        numerKarty: '',
        ulica: '',
        miasto: '',
        kodPocztowy: '',
        numerTelefonu: '',
        nip: '',
        stanowisko: '',
        dataOrzeczenia: null
      },
      typWizyty: '',
      rodzajBadan: null,
      dataWizyty: '',
      usluga: {
        uslugaId: '',
        nazwa: '',
        cenaZwykla: null,
        cenaUmowa: null,
        cenaRabat: null
      },
      faktura: ''
    },
    rozliczenia: {},
    faktura: null,
    companies: []
  },
  getters: {
    getPatients: state => {
      return state.patients
    },
    getPatientForReg: state => {
      return state.patientForReg
    },
    getCompanies: state => {
      return state.companies
    },
    getWizyta: state => {
      return state.wizyta
    },
    getAllRozliczenia: state => {
      return state.rozliczenia
    },
    getFaktura: state => {
      return state.faktura
    },
    getIsAuthenticated: state => {
      return state.isAuthenticated
    }
  },

  mutations: {
    AUTHENTICATE_USER: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated
    },
    // RESET_WIZYTA: state => {
    //   state.wizyta = {
    //     pacjent: {
    //       pacjentId: '',
    //       imie: '',
    //       nazwisko: '',
    //       pesel: '',
    //       numerKarty: '',
    //       ulica: '',
    //       miasto: '',
    //       kodPocztowy: '',
    //       numerTelefonu: '',
    //       nip: '',
    //       stanowisko: '',
    //       dataOrzeczenia: null
    //     },
    //     typWizyty: '',
    //     rodzajBadan: null,
    //     dataWizyty: '',
    //     usluga: {
    //       uslugaId: '',
    //       nazwa: '',
    //       cenaZwykla: null,
    //       cenaUmowa: null,
    //       cenaRabat: null
    //     },
    //     faktura: ''
    //   }
    // },
    UPDATE_PATIENT_FOR_REGISTRATION: (state, pacjent) => {
      state.wizyta.pacjent = pacjent
    },
    UPDATE_TYP_WIZYTY: (state, typWizyty) => {
      state.wizyta.typWizyty = typWizyty
    },
    UPDATE_RODZAJ_BADAN: (state, rodzajBadan) => {
      state.wizyta.rodzajBadan = rodzajBadan
    },
    UPDATE_DATE_AND_TIME: (state, dataWizyty) => {
      state.wizyta.dataWizyty = dataWizyty
    },
    UPDATE_PATIENT_COMPANY: (state, firma) => {
      state.wizyta.pacjent.firma = firma
    },
    UPDATE_USLUGA: (state, usluga) => {
      state.wizyta.usluga = usluga
    },
    GET_ALL_PATIENTS_FROM_DB: (state, patients) => {
      state.patients = patients
    },
    GET_ALL_COMPANIES_FROM_DB: (state, companies) => {
      state.companies = companies
    },
    GET_ALL_ROZLICZENIA_FROM_DB: (state, rozliczenia) => {
      state.rozliczenia = rozliczenia
    },
    GET_FAKTURA: (state, faktura) => {
      state.faktura = faktura
    },
    ADD_COMPANY: (state, company) => {
      state.companies.push(company)
    }
  },
  actions: {}
})
