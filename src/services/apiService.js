import axios from 'axios'
import API from '@/constants/api'
import router from '../router'

export default {
  getCompanies() {
    return axios.get(`${API.url}/firmy`)
  },
  getCompany(id) {
    return axios.get(`${API.url}/firmy/${id}`)
  },
  addCompany(company) {
    return axios.post(`${API.url}/firmy`, company)
  },
  getPatients() {
    return axios.get(`${API.url}/pacjenci`, {
      params: {
        pageNumber: 1,
        pageSize: 50,
        order: 'ASC',
      },
    })
  },
  submitPatient(patient) {
    return axios.post(`${API.url}/pacjenci`, patient)
  },
  deletePatient(patientID) {
    return axios.delete(`${API.url}/pacjenci/${patientID}`)
  },
  registerVisit(wizyta) {
    return axios
      .post(`${API.url}/wizyty`, wizyta)
      .then(() => router.push({ path: '/success' }))
      .catch(() => router.push({ path: '/error' }))
  },
  getRozliczenia() {
    return axios.get(`${API.url}/rozliczenia/medycyna-pracy`)
  },
  submitForInvoice(doZafakturowania) {
    return axios.post(`${API.url}/faktury`, doZafakturowania)
  },
  getInvoice(invoiceID) {
    return axios.get(`${API.url}/faktury/${invoiceID}`)
  },
  getUslugi() {
    return axios.get(`${API.url}/uslugi`)
  },
  login(login, pass) {
    var encodedBase64String = btoa(`${login}:${pass}`)
    const options = {
      headers: {
        Authorization: `Basic ${encodedBase64String}`,
      },
      withCredentials: true,
    }
    return axios.get(`${API.url}/login`, options)
  },
  logout() {
    return axios.get(`${API.url}/logout`)
  },
}
