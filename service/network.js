import {
  baseUrl
} from './config'

export default function(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      methods: options.methods || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}