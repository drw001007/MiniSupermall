// pages/cart/childCpns/cart-list-item/cart-list-item.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckClick(event) {
      // 1.查找对应商品
      const goods = app.globalData.cartList.find(item => item.iid == this.properties.goods.iid)
      goods.checked = !goods.checked
      
      // 2.获取当前商品的index
      const index = event.currentTarget.dataset.index

      // 3.回调
      app.changeGoodsState(index, goods)
    }
  }
})
