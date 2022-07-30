import axios from "axios";
import config from "../config";

axios.defaults.baseURL = config.PROD_API_URL;

axios.defaults.headers.common["Authorization"] = `Bearer ${
    localStorage.getItem("token") || ""
}`;

axios.interceptors.response.use(undefined, (error: any) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        console.log(error);
    }

    return Promise.reject(error);
});
function setJwt(jwt: any) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    setJwt,
};

export default http;
