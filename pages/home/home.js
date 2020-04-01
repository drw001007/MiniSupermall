// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../service/home'

const TOP_DISTANCE = 800
const types = ['pop', 'new', 'sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {page:0, list: []},
      'new': {page:0, list: []},
      'sell': {page:0, list: []}
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.请求轮播图以及推荐数据
    this._getMultidata()

    // 2.请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },

  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 上拉加载更多
    this._getGoodsData(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 监听页面滚动
  */
  onPageScroll(options) {
    // 1.取出scrollTop
    const scrollTop = options.scrollTop
    
    // 2.修改showBackTop属性
    // 官方： 不要在滚动的函数中频繁的调用this.setData
    const flag1 = scrollTop >= TOP_DISTANCE
    if(flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }
    // 3.修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  },

  // ------------------------网络请求函数---------------------------
  _getMultidata() {
    getMultiData().then(res => {
      // 取出轮播图和推荐数据
      const banners = res.data.data.banner.list.map(item => {
        return item.image
      })
      
      const recommends = res.data.data.recommend.list

      // 将banners和recommends放到data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    // 1.获取页码
    const page = this.data.goods[type].page + 1

    // 2.发送网络请求
    getGoodsData(type, page).then(res => {
      // 2.1.取出数据
      const list = res.data.data.list

      // 2.2.将数据设置到对应type的list中
      const oldList = this.data.goods[type].list
      oldList.push(...list)

      // 2.3.将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`
      const typePage = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [typePage]: page
      })
    })
  },

  // ---------------------事件监听函数-----------------------------------
  handleTabClick(event) {
    // 取出index
    const index = event.detail.index
    
    // 设置currentType
    const type = types[index]
    this.setData({
      currentType: type
    })
  },
  // 获取tab-control距离顶部的距离
  handleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  }
})