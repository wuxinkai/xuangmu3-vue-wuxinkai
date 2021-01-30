
import Cookies from 'js-cookie'
function DownLoadFile(options) {
  var config = options
  let divBox = document.createElement('div')
  let form = document.createElement('form')
  divBox.id = 'divBox'
  form.id = 'down-file-form'
  form.target = '_self'
  form.method = `${config.method}`
  form.action = `${config.url}?tokenID=${Cookies.get("Tescomm_Access_Token")}`
  let formChildStr = ''
  for (var key in config.data) {
    let input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = config.data[key]
    form.appendChild(input)
  }

  form.innetHTML = formChildStr
  document.getElementsByTagName('body')[0].appendChild(divBox)
  document.getElementById('divBox').appendChild(form)
  form.submit()
  document.getElementsByTagName('body')[0].removeChild(divBox)
}

/**
 *  导出自定义表格
 *  @param {} params object
 *  使用 ：
 *  import { exportExcel } from '@/utils/excel'
 *  exportExcel({})
 */

function exportExcel(options) {
  if (!options.captions || !options.columns || !options.url) return;
  var exportData = {};
  exportData.url = options.url;
  exportData.method = options.method;
  exportData.data = {};
  if (options.captions instanceof Array) {
    exportData.data.captions = options.captions.join(",");
  } else {
    exportData.data.captions = options.captions;
  }
  if (options.columns instanceof Array) {
    exportData.data.columns = options.columns.join(",");
  } else {
    exportData.data.columns = options.columns;
  }
  let typeslength = exportData.data.columns.split(",").length;
  if (!options.types) {
    var types = [];
    for (var i = 0; i < typeslength; i++) {
      types.push("string");
    }
    exportData.data.types = types.join(",");
  } else {
    if (options.types instanceof Array) {
      exportData.data.types = options.types.join(",");
    } else {
      exportData.data.types = options.types;
    }
  }
  exportData.data.condition = options.condition;
  exportData.data.fileName = options.fileName;
  DownLoadFile(exportData);
}
export let Excel = exportExcel
