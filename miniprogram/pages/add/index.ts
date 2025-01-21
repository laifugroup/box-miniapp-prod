Page({
  data: {
    name: '',
    location: '',
    category: '',
    image: ''
  },

  onNameInput(e: any) {
    this.setData({
      name: e.detail.value
    })
  },

  onLocationInput(e: any) {
    this.setData({
      location: e.detail.value
    })
  },

  async chooseImage() {
    const res = await wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    })
    
    this.setData({
      image: res.tempFilePaths[0]
    })
  },

  async submitForm() {
    // TODO: 提交表单到后端
    wx.navigateBack()
  }
}) 