import axios from 'axios'
export const request = (obj) =>{
  const baseUrl = '/api'
  const url = baseUrl + obj.url
  return axios({
    method: obj.methods,
    url,
    data: obj.data,
    params: obj.params
  })
}

export const requestToken = (obj) =>{
  const baseUrl = '/api'
  const token = localStorage.getItem('token') || ''
  const url = baseUrl + obj.url
  return axios({
    method: obj.methods,
    url,
    data: {...obj.data,token:token}
  })
}