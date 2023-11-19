import Cookies from "universal-cookie";


const urlApis = {
    "social": "http://127.0.0.1:9000/api",
    "admission": "http://127.0.0.1:9010/api"
};

const isAuthenticated = () => {
    const cookies = new Cookies();
    const utoken = cookies.get("utoken");
    if(utoken === undefined) {
        return false;
    }
    return true;
}

export {
    urlApis,
    isAuthenticated
}