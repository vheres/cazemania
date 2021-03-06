const INITIAL_STATE = { firstname: "", lastname: "", email: "", category: "", token: "", error: "", cookieCheck: false}


// INITIAL_STATE => default parameter, kalau state tidak menerima apa2 (belum ada state terakhir)
export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "USER_LOGIN_SUCCESS" :
            return {...action.payload, cookieCheck: true};
        case "USER_LOGIN_FAIL":
            return {...state, ...action.payload}
        case "USER_REGISTER_FAIL":
            return {...state, error: "Username/E-mail is already used"}
        case "COOKIES_CHECKED":
            return {...state, cookieCheck: true}
        case "USER_LOGOUT" :
            return INITIAL_STATE;
        default :   
            return state;
    }
}