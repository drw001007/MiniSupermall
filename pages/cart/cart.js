// pages/cart/cart.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isSelectAll: false,
    totalPrice: 0,
    totalCounter: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })

    // 2.设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeDate()
    }

    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })
      
      // 2.修改全部选中的状态
      this.checkSelectAll()
      this.changeDate()
    }
  },
  onSelectAll() {
    // 1.判断是否全部选中
    if(this.data.isSelectAll) {
      this.data.cartList.forEach(item => { // 全部选中的情况下
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    } else { // 全部没选中或者部分没选中
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
    this.changeDate()
  },
  changeDate() {
    // 1.获取所有选中的数据
    let totalPrice = 0
    let counter = 0

    for(let item of this.data.cartList) {
      if(item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }

    this.setData({
      totalPrice: totalPrice,
      totalCounter: counter
    })
  },
  checkSelectAll() {
    const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
  },
  onCheckSelect() {
    if(this.data.cartList.length === 0) {
      this.setData({
        isSelectAll: false
      })
    } 
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
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
    this.checkSelectAll()
    this.onCheckSelect()
    this.changeDate()
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

  }
})