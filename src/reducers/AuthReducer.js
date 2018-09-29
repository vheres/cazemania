const INITIAL_STATE = { username: "", email: "", error: "", id: "", password: "", cookieCheck: false}


// INITIAL_STATE => default parameter, kalau state tidak menerima apa2 (belum ada state terakhir)
export default (state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case "USER_LOGIN_SUCCESS" :
            return {username: action.payload.username, email: action.payload.email, error: action.payload.error, id: action.payload.id, password: action.payload.password, cookieCheck: action.payload.cookieCheck};
        case "USER_LOGIN_FAIL" :
            return { ...state, error: "Authentication Error"};
        case "USER_LOGOUT" :
            return INITIAL_STATE;
        case "COOKIES_CHECKED" :
            return { ...state, cookieCheck: true }
        default:
            return state;
    }
}