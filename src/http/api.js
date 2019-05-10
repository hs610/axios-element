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

/** 
 * api接口统一管理
 */
import { get, post } from './axios';

/**
 * 
 * @param {string} params 
 * 我们定义了一个topics方法
 * 这个方法有一个参数params
 * params是我们请求接口时携带的参数对象
 * 而后调用了我们封装的post方法
 * post方法的第一个参数是我们的接口地址
 * 第二个参数是topics的params参数
 * 即请求接口时携带的参数对象
 * 最后通过export导出topics。
 */

// 主题首页
export const topics = params => get('/topics', params);
// 主题详情 接口拼接id
export const topic = ( id, params) => get('/topic/' + id, params);