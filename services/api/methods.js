/*
* Author: tchiang.wang@gmail.com'
* Date: '2025-01-21 13:05:44'
* Project: 'FleetnowV4'
* Path: 'api/methods.js'
* File: 'methods.js'
* Version: '1.0.0'
*/

const apiSettings = {
    dev: {
        baseUrl: 'http://192.168.0.13:8000',
    },
    prod: {
        baseUrl: 'https://api.fleetnow.ca',
    },
}

const apiPath = '/api/app/';
const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
}

const currentSettings = apiSettings.prod;

const useCustomFetch = (url, options) => {
    return $fetch(url, {
        baseURL: currentSettings.baseUrl + apiPath,
        headers: headers,
        credentials: 'include',
        ...options,
        async onRequest(ctx) {
            console.log('[fetch request]', ctx.options.headers);
        },
        async onResponse(ctx) {
            console.log('[fetch response]', ctx.response);
        },
        async onResponseError(ctx) {
            console.log('[fetch response error]')
        },
        async onRequestError(ctx) {
            console.log('[fetch request error]')
        }
    })
}

export const GET = (url, params, options) => useCustomFetch(url, { method: 'GET', query: params, ...options });
export const POST = (url, body, options) => useCustomFetch(url, { method: 'POST', body: JSON.stringify(body), ...options });
export const PUT = (url, body, options) => useCustomFetch(url, { method: 'PUT', body: JSON.stringify(body), ...options });
export const PAT = (url, body, options) => useCustomFetch(url, { method: 'PATCH', body: JSON.stringify(body), ...options });
export const DEL = (url, params, options) => useCustomFetch(url, { method: 'DELETE', query: params, ...options }); 