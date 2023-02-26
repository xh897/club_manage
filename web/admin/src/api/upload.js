import request from '@/utils/request'

export function upload(data) {
  return request({
    url: '/uploads',
    method: 'post',
    data,
    timeout: 30000
  })
}

export function singleUpload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data: data.formData,
    timeout: 30000,
    headers: { fileName: data.fileName }
  })
}


export function uploadExcel(data) {
  return request({
    url: '/uploadExcel',
    method: 'post',
    data,
    timeout: 50000
  })
}
