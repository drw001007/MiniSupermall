// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getReadCategoryDetail
} from '../../service/category'

const types = ['pop', 'new', 'sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {

    },
    currentIndex: 0,
    currentType: 'pop'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData()
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

  // -------------------------------网络请求函数----------------------------
  _getData() {
    // 1.请求分类数据
    getCategory().then(res => {
      // 1.获取categories
      const categories = res.data.data.category.list

      // 2.初始化每个类别的子数据
      const categoryData = {}
      for(let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: {
            'pop': [],
            'new': [],
            'sell': []
          }
        }
      }

      // 3.修改data中的数据
      this.setData({
        categories: categories,
        categoryData: categoryData
      })

      // 4.请求第一个类别的数据
      this._getSubcategory(0)

      // 5.请求第一个类别的详情数据
      this._getCategoryDeatil(0)
    })
  },
  _getSubcategory(currentIndex) {
    // 1.获取对应的maikey
    const maitkey = this.data.categories[currentIndex].maitKey
    
    // 2.通过maitkey请求数据
    getSubcategory(maitkey).then(res => {
      const tempCategoryData = this.data.categoryData
      tempCategoryData[currentIndex].subcategories = res.data.data.list
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDeatil(currentIndex) {
    // 1.获取对应的miniWallKey
    const miniWallKey = this.data.categories[currentIndex].miniWallkey
    
    // 2.请求类别的数据
    this._getReadCategoryDetail(currentIndex, miniWallKey, 'pop')
    this._getReadCategoryDetail(currentIndex, miniWallKey, 'new')
    this._getReadCategoryDetail(currentIndex, miniWallKey, 'sell')
  },
  _getReadCategoryDetail(index, miniWallKey, type) {
    getReadCategoryDetail(miniWallKey, type).then(res => {
      // 1.获取categoryData
      const categoryData = this.data.categoryData

      // 2.修改数据
      categoryData[index].categoryDetail[type] = res.data

      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },

  // ---------------------------事件监听函数---------------------------
  menuClick(event) {
    // 1.改变当前currentIndex
    const currentIndex = event.detail.currentIndex
    this.setData({
      currentIndex: currentIndex
    })

    // 2.请求对应的currentIndex的数据
    this._getSubcategory(currentIndex)

    // 3.请求对应的currentIndex的详情数据
    this._getCategoryDeatil(currentIndex)
  },
  tabClick(event) {
    const index = event.detail.index
    this.setData({
      currentType: types[index]
    })
  }
})