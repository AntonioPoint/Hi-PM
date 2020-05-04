// 云函数入口文件
const cloud = require('wx-server-sdk')
// cloud.init()
const extCi = require("@cloudbase/extension-ci")
const tcb = require("tcb-admin-node")
const TcbRouter = require("tcb-router")
tcb.init({
  env: "prd-cloud001"
});
tcb.registerExtension(extCi);
// 擦，腾讯云环境Node版本太低，不支持 Promise.allSettled ，so do below
if (typeof Promise.allSettled !== "function") {
  Promise.allSettled = function (promises) {
    return new Promise(function (resolve, reject) {
      if (!Array.isArray(promises)) {
        return reject(
          new TypeError("arguments must be an array")
        );
      }
      var resolvedCounter = 0;
      var promiseNum = promises.length;
      var resolvedValues = new Array(promiseNum);
      for (var i = 0; i < promiseNum; i++) {
        (function (i) {
          Promise.resolve(promises[i]).then(
            function (value) {
              resolvedCounter++;
              resolvedValues[i] = value;
              if (resolvedCounter == promiseNum) {
                return resolve(resolvedValues);
              }
            },
            function (reason) {
              resolvedCounter++;
              resolvedValues[i] = reason;
              if (resolvedCounter == promiseNum) {
                return reject(reason);
              }
            }
          );
        })(i);
      }
    });
  };
}


/**
 * 云函数入口函数，使用tcb-router
 */
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  //图像类型及标签识别
  app.router('detectTypeAndLabel', async (ctx, next) => {
    await Promise.allSettled([detectType(event.cloudPath), detectLabel(event.cloudPath)]).then((res) => {

      const detectTypeDate = res[0]
      const detectLabelDate = res[1]

      const detectTypeResult = getDetectTypeResult(detectTypeDate)
      const detectLabelResult = getDetectLabelResult(detectLabelDate)

      ctx.body = (detectTypeResult.status !== 0) ? detectTypeResult : detectLabelResult

    })
  })

  //图像标签识别
  const detectLabel = (cloudPath) => {
    return tcb.invokeExtension('CloudInfinite', {
      action: 'DetectLabel',
      cloudPath: cloudPath
    })
  }
  //图像标签识别
  const detectType = (cloudPath) => {
    return tcb.invokeExtension('CloudInfinite', {
      action: 'DetectType',
      cloudPath: cloudPath,
      operations: {
        type: ["porn", "terrorist", "politics"]
      }
    })
  }

  const getDetectTypeResult = (data) => {
    let result = {}
    try {
      result = data.data.RecognitionResult
      console.log(result)
      const {
        PornInfo = [], TerroristInfo = [], PoliticsInfo = []
      } = result
      const pornOne = PornInfo || {}
      const terroristOne = TerroristInfo || {}
      const politicsOne = PoliticsInfo || {}

      if (pornOne.HitFlag === 0 && terroristOne.HitFlag === 0 && politicsOne.HitFlag === 0) {
        result.status = 0
        result.message = '图像安全审核通过'
      } else {
        result.status = -1
        result.message = 'AI判定为违禁图片'
      }
    } catch (error) {
      console.log('error :', error)
      result.status = -1000
      result.message = '服务器掉链子了,稍后重试'
      return result
    }
    return result
  }

  const getDetectLabelResult = (data) => {
    let result = {}
    try {
      result.status = 0
      result.data = data.data.RecognitionResult.Labels
      return result
    } catch (error) {
      console.log('error :', error)
      result.status = -1000
      result.message = '服务器掉链子了,稍后重试'
      return result
    }
  }
  return app.serve()
}