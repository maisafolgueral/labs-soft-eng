import Cookies from "universal-cookie";


const socialAPI = 'http://127.0.0.1:5000/api';

const isAuthenticated = () => {
    const cookies = new Cookies();
    const utoken = cookies.get("utoken");
    if(utoken === undefined) {
        return false;
    }
    return true;
}

export {
    socialAPI,
    isAuthenticated
}