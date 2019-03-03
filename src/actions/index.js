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
                const {firstname, lastname, email, category, token} = user.data.result
                localStorage.setItem("token", token || "");
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        category: category,
                        token: token,
                        error: "",
                        cookieCheck: true }
                })       
            }).catch(err => {
                console.log(err);
                const { message } = err.response.data
                dispatch ({
                    type: "USER_LOGIN_FAIL",
                    payload: {
                        error: message
                    }
                });
            })
        }
    }

export const keepLogin = () => {
    return(dispatch) => {
            const token = localStorage.getItem('token');
            const headers = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                }
            };
            axios.get(API_URL_1 +'/auth/userinfo', headers)
            .then(user => {
                const {firstname, lastname, email, category, token} = user.data.result
                localStorage.setItem("token", token || "");
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        category: category,
                        token: token,
                        error: "",
                        cookieCheck: true }
                })       
            }).catch(err => {
                console.log(err);
                const { message } = err.response.data
                dispatch ({
                    type: "USER_LOGIN_FAIL",
                    payload: {
                        error: message
                    }
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
        localStorage.removeItem("token");
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
                const {firstname, lastname, email, category, token} = res.data.result
                localStorage.setItem("token", token || "");
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        category: category,
                        token: token,
                        error: "",
                        cookieCheck: true }
                })     
                ReactPixel.track('CompleteRegistration')
            }
        })
        .catch((err) => {
            alert(err.response.data.message);
        })
    }
}