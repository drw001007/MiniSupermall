// pages/cart/childCpns/d-bottom-bar/d-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Boolean,
      value: false
    },
    price: {
      type: Number
    },
    counter: {
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
    selectClick() {
      this.triggerEvent('selectAll', {}, {})
    }
  }
})