// pages/detail/detail.js
import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../service/detail'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.获取传入的iid
    this.setData({
      iid: options.iid
    })

    // 2.请求商品详情数据
    this._getDetailData()

    // 3.请求推荐数据
    this._getRecommends()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // ------------------------网络请求函数------------------------
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      const data = res.data.result

      // 1.取出顶部的图片
      const topImages = data.itemInfo.topImages

      // 2.创建baseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建shopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo)

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      let commentInfo = {}
      if(data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages: topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramInfo: paramInfo,
        commentInfo: commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      const recommends = res.data.data.list
      this.setData({
        recommends: recommends
      })
    })
  },
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid
    obj.imageURL = this.data.topImages[0]
    obj.title = this.data.baseInfo.title
    obj.desc = this.data.baseInfo.desc
    obj.price = this.data.baseInfo.realPrice

    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功'
    })
  }
})