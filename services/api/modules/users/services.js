/*
* Author: tchiang.wang@gmail.com'
* Date: '2025-01-21 13:20:11'
* Project: 'FleetnowV4'
* Path: 'api/modules/users/services.js'
* File: 'services.js'
* Version: '1.0.0'
*/

import { GET, POST } from "~/api/methods";

export const checkUserLoginState = () => GET('users/login-state/');
export const login = (params) => POST('users/sign-in/', params); 