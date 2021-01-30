//获取天气
export const getWeather = param => {
  return $http.request({
    // url: 'https://free-api.heweather.net/s6/weather/now?location='+param+'&key=fec79ff1f8454d72b9d92486f43cb571',
    // method: 'get',
    // header: { "content-type": "application/json" }
  })
}
