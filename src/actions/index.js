import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import ReactPixel from 'react-facebook-pixel';

const { encrypt } = require('../supports/helpers/encryption.js');
const { appKey } = require('../supports/config')

export const onLogin = (user) => {
    const { email, password } = user
    const ep = encrypt(appKey, password)
    return(dispatch) => {
            axios.post(API_URL_1 +'/auth/login', {
                    email: email,
                    ep: ep
            }).then(user => {
                localStorage.setItem("token", user.data.result.token || "");
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { firstname: user.data.result.firstname, lastname: user.data.result.lastname, email: user.data.result.email, category: user.data.result.category, token: user.data.result.token, error: "", cookieCheck: true }
                })       
            }).catch(err => {
                console.log(err);
                dispatch ({
                    type: "USER_LOGIN_FAIL"
                });
            })
        }
    }

export const keepLogin = (email) => {
    console.log(email);
    return(dispatch) => {
            const token = localStorage.getItem('token');
            const headers = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                }
            };
            axios.get(API_URL_1 +'/keeplogin', {
                params: {
                    email: email
                }
            })
            .then(user => {
                localStorage.setItem("token", user.data.result.token || "");
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { firstname: user.data.result.firstname, lastname: user.data.result.lastname, email: user.data.result.email, category: user.data.result.category, token: user.data.result.token, error: "", cookieCheck: true }
                })       
            }).catch(err => {
                console.log(err);
                dispatch ({
                    type: "USER_LOGIN_FAIL"
                });
            })
        }
    }

export const cookieChecked = () => {
    return {
        type: "COOKIES_CHECKED"
    }
}

export const onLogout = () => {
    return(dispatch) => {
        dispatch ({
            type: "USER_LOGOUT"
        });
        dispatch ({
            type: "COOKIES_CHECKED"
        });
    }
}

export const onRegister = (user) =>{
    const { firstName, lastName, gender, email, password, phone, address, destination_code, kota, kodepos  } = user
    const ep = encrypt(appKey, password)
    return(dispatch) => {
        axios.post(API_URL_1 + "/auth/register", {
            firstname: firstName,
            lastname: lastName,
            ep: ep,
            gender: gender,
            email: email,
            phone: phone,
            address: address,
            destination_code: destination_code,
            kota: kota,
            kodepos: kodepos
        })
        .then((res) => {
            if(res.data.error === 1){
                dispatch({
                    type: "USER_REGISTER_FAIL"
                })
            }
            else{
                localStorage.setItem("token", user.data.result.token || "");
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { firstname: user.data.result.firstname, lastname: user.data.result.lastname, email: user.data.result.email, category: user.data.result.category, token: user.data.result.token, error: "", cookieCheck: true }
                })
                ReactPixel.track('CompleteRegistration')
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
}