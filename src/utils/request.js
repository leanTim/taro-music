import Taro from '@tarojs/taro';
import { baseURL } from '../config';

const request_data = {
  platform: 'wap',
  rent_mode: 2,
};

export default (options = { method: 'GET', data: {} }) => {
  const {
    method: method = 'GET',
    data: data = {},
    url
  } = options
  // if (!noConsole) {
  console.log(`${new Date().toLocaleString()}【 M=${url} 】P=${JSON.stringify(data)} method=${method}`);
  // }
  return Taro.request({
    url: baseURL + options.url,
    data: {
      ...request_data,
      ...data
    },
    header: {
      'Content-Type': 'application/json',
    },
    method: method.toUpperCase(),
  }).then((res) => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      // if (!noConsole) {
      console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,res.data);
      // }
      if (data.status && data.status !== 'ok') {
        Taro.showToast({
          title: `${res.data.error.message}~` || res.data.error.code,
          icon: 'none',
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}
