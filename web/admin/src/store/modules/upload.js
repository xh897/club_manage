import { singleUpload, upload, uploadExcel } from '@/api/upload'

const actions = {
  upload({ commit }, data) {
    return new Promise((resolve, reject) => {
      upload(data)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  singleUpload({ commit }, data) {
    return new Promise((resolve, reject) => {
      singleUpload(data)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  uploadExcel({ commit }, data) {
    return new Promise((resolve, reject) => {
      uploadExcel(data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}

export default {
  actions,
  namespaced: true
}
