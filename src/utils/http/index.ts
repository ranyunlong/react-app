import { AxiosError } from 'axios';
import { HttpClient, HttpException } from '@quick-toolkit/http';
import qs from 'qs';

import { notification } from 'antd';
import { EnvUtils } from '@quick-toolkit/ant-design-plus';

export const http = HttpClient.create({
  baseURL: EnvUtils.isDev() ? '/api' : '/',
  paramsSerializer: (params) =>
    qs.stringify(params, {
      allowDots: true,
    }),
  transformRequest: [
    (data, config) => {
      if (config && config['Content-Type'] === 'app/json') {
        return JSON.stringify(data);
      }
      if (
        data instanceof FormData ||
        Object.prototype.toString.call(data) === '[object FormData]' ||
        Object.prototype.toString.call(data) === '[object String]'
      ) {
        return data;
      }
      return qs.stringify(data, {
        allowDots: true,
      });
    },
  ],
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'app/x-www-form-urlencoded',
  },
});

// http.interceptors.request.use(
//   (config) => {
//     config.params = qs.stringify(config.params, {
//       allowDots: true,
//     });
//     return config;
//   },
//   (err) => Promise.reject(err)
// );

http.interceptors.response.use(
  (res) => {
    const { data } = res;
    if (!(data instanceof ArrayBuffer) && data.code !== 0) {
      notification.error({
        description: 'title',
        message: data.message,
      });
      throw new HttpException(res.config, res);
    }
    return res;
  },
  (err: AxiosError<any>) => {
    if (err.isAxiosError) {
      if (err.response) {
        const { status, statusText, data } = err.response;
        if (
          status === 401 &&
          localStorage.getItem('token') &&
          data &&
          data.message
        ) {
          notification.error({
            description: 'title',
            message: data.message,
          });
        } else if (data && data.msg) {
          notification.error({
            message: statusText,
            description: data.msg,
          });
        } else if (statusText) {
          notification.error({
            message: statusText,
            description: err.message,
          });
        }
      }
    }
    return Promise.reject(err);
  }
);
