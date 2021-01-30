//页面加载遮罩层
import {
  Loading
} from 'element-ui'
const loading = {}
loading.show = function (loadingText, loadingClass, loadingIocn,loadingBg) {
  Loading.service({
    fullscreen: true,
    customClass:loadingClass || '',
    text: loadingText || 'loading.....',
    spinner: loadingIocn || 'el-icon-loading',
    background: loadingBg || 'rgba(0, 0, 0, 0.7)'
  })
}
loading.close = function () {
  Loading.service({
    fullscreen: true
  }).close()
}
export let elLoading = loading
