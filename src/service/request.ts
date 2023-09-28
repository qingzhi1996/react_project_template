import axios from 'axios';
import { message } from 'antd';
import { BASE_URL, TIMEOUT } from './config';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

// http request 拦截器
service.interceptors.request.use(
  (config: any) => {
    //请求携带的信息
    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// http response 拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code == 200) {
      return res
    } else {
      message.error({
        content: res.message,
        duration: 2,
      });
    }
  },
  (error) => {
    message.error({
      content: error.message,
      duration: 2,
    });
    return Promise.reject(error);
  }
);
export default service;
