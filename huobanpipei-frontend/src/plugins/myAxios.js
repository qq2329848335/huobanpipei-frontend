// Set config defaults when creating the instance
import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8888/api',
    //这里我按官网把withCredentials放在里面不行, 就放外面了
    /*// `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true, // default false*/
});
//表示跨域请求时需要使用凭证
myAxios.defaults.withCredentials = true;

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("我要发送请求了",config);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    console.log("接收到响应",response);
    // 对响应数据做点什么
    if (response?.data?.code===40100) {
        const redirectUrl = window.location.href;
        window.location.href=`/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
