Page({
  data: {
    imageTag: [],
    filepath: ''
  },
  onLoad: function () {},

  // 图像智能检测
  onCheckImageTag() {
    const that = this
    let filepath = ''
    let cloudPath = ''
    that.chooseImage({})
      .then(res => {
        wx.showLoading({
          title: '识别中...',
        })
        filepath = res[0]
        cloudPath = 'checked-image' + filepath.match(/\.[^.]+?$/)[0]
        return that._doUpload(filepath, cloudPath)
      })
      .then((res) => {
        console.log('[上传文件] 成功：', res, cloudPath)
        return that._detectLabelAndType(cloudPath)
      })
      .then((res) => {
        console.log("[识别图片] 结果:", res)
        if (res.result.status === 0) {
          that.setData({
            imageTag: res.result.data,
            filepath: filepath
          })
          wx.hideLoading()
        } else if (res.result.status < 0) {
          wx.hideLoading()
          wx.showToast({
            title: res.result.message,
            duration: 3000
          })
        } else {
          wx.showToast({
            title: '发生了一个让人意外的错误',
            duration: 3000
          })
        }
      })
  },


  //chooseImage封装
  chooseImage({
    count = 1,
    sizeType = '[compressed]',
    sourceType = ['album', 'camera'],
  }) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: count,
        sizeType: sizeType,
        sourceType: sourceType,
        success: function (res) {
          resolve(res.tempFilePaths);
        },
        fail: function (error) {
          reject(error)
        }
      })
    });
  },


  //调用云API:返回图像类型及标签识别结果Promise
  _detectLabelAndType(cloudPath) {
    return wx.cloud.callFunction({
      name: "tcb-ai",
      data: {
        $url: "detectTypeAndLabel",
        cloudPath: cloudPath
      }
    })
  },



  //图像标签识别&图像类型识别
  _detectImageLabelAndType(cloudPath) {
    return Promise.allSettled([this._detectLabel(cloudPath), this._detectType(cloudPath)])
  },

  //调用云API:返回上传图片Promise
  _doUpload(filepath, cloudPath) {
    return wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filepath
    })
  },

  //调用云API:返回图像标签识别结果Promise
  _detectLabel(cloudPath) {
    return wx.cloud.callFunction({
      name: 'tcb-ai',
      data: {
        $url: "detectLabel",
        cloudPath: cloudPath
      }
    })
  },

  //调用云API:返回图像类型识别结果Promise
  _detectType(cloudPath) {
    return wx.cloud.callFunction({
      name: 'tcb-ai',
      data: {
        $url: "detectType",
        cloudPath: cloudPath
      }
    })
  }

})