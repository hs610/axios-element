/* eslint-disable no-undef */
/* eslint-disable block-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable brace-style */
/* eslint-disable space-before-blocks */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable space-in-parens */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable indent */

import axios from 'axios';
import Qs from 'qs';
import { Message, Loading } from 'element-ui'; // 消息提示框组件


// 环境的切换
if (process.env.NODE_ENV == 'development') { 
    axios.defaults.baseURL = 'https://cnodejs.org/api/v1';
   } else if (process.env.NODE_ENV == 'debug') { 
    axios.defaults.baseURL = 'https://cnodejs.org/api/v1';
   } else if (process.env.NODE_ENV == 'production') { 
    axios.defaults.baseURL = 'https://cnodejs.org/api/v1';
   };

// 设置请求超时时间
axios.defaults.timeout = 10000;

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截
axios.interceptors.request.use( config => { 
    // 在发送请求之前做些什么 验证token之类的
    Loading.service(true);
     return config; 
    }, error => { 
    // 对请求错误做些什么
     return Promise.error(error); 
    })

// 响应拦截
axios.interceptors.response.use( response => {
    // 对响应数据做点什么
    return response;
  }, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


// 封装get方法和post方法

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){ 
    return new Promise((resolve, reject) =>{ 
    axios.get(url, {  
     params: params 
    }).then(res => {
     resolve(res.data);
     Loading.service(true).close();
    //  Message({message: '请求成功', type: 'success'});
    }).catch(err => {
     reject(err.data) 
     Loading.service(true).close();
     Message({message: '加载失败', type: 'error'});
    }) 
   });}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
     axios.post(url, Qs.stringify(params))
    .then(res => {
     resolve(res.data);
     Loading.service(true).close();
    //  Message({message: '请求成功', type: 'success'});
    })
    .catch(err => {
     reject(err.data)
     Loading.service(true).close();
     Message({message: '加载失败', type: 'error'});
    })
    });}