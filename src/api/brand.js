import api from './axios'

export function getBrands() {
  return api.get('/brands/getAll')
}
