import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';

export const onLogin = (user) => {
    return(dispatch) => {
            axios.get(API_URL_1 +'/users', {
                params: {
                    email: user.email,
                    password: user.password
                }
            }).then(user => {
                console.log(user);
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { firstname: user.data[0].firstname, email: user.data[0].email, error: "", id: user.data[0].id, cookieCheck: true }
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
            axios.get(API_URL_1 +'/keeplogin', {
                params: {
                    email: email
                }
            }).then(user => {
                console.log(user)
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { firstname: user.data[0].firstname, email: user.data[0].email, error: "", id: user.data[0].id, cookieCheck: true  }
                })
                dispatch ({
                    type: "COOKIES_CHECKED"
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
    return(dispatch) => {
        axios.post(API_URL_1 + "/users", user)
        .then((res) => {
            console.log(res)
            if(res.data.error === 1){
                dispatch({
                    type: "USER_REGISTER_FAIL"
                })
            }
            else{
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { firstname: res.data.firstname, email: res.data.email, error: "", id: res.data.id, cookieCheck: true }
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
}