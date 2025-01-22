/*
* Author: tchiang.wang@gmail.com'
* Date: '2025-01-21 13:20:11'
* Project: 'FleetnowV4'
* Path: 'api/modules/users/services.js'
* File: 'services.js'
* Version: '1.0.0'
*/

import { GET, POST } from '../../methods'

export const userAPI = {
    checkLoginState: () => GET('users/login-state/', null),
    login: (params) => POST('users/sign-in/', params),
    signup: (params) => POST('users/sign-up/', params),
    getProfile: () => GET('users/profile/', null),
    updateProfile: (params) => POST('users/profile/update/', params),
    getCreditLogs: () => GET('users/credit-logs/', null)
}

export default userAPI 