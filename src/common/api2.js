import axios from 'axios';
export const API = axios.create({
    baseURL: `https://www.ncdc.noaa.gov/cdo-web/api/v2/`
})
API.interceptors.request.use(function (config) {
    config.headers.token = 'AlOCstuxmDrmZEVMyzYRHkJtzIOjDLBD';
    return config;
}, function (error) {
    return Promise.reject(error);
});