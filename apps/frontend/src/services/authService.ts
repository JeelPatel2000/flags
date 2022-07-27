import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

export async function login(email: string, password: string) {
    const result = await http.post(`${apiEndpoint}/login`, {
        email,
        password,
    });
    localStorage.setItem(tokenKey, result.data);
    return result;
}

export async function register({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) {
    const result = await http.post(`${apiEndpoint}/register`, {
        name,
        email,
        password,
    });

    return result;
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey) || "";
        const user: any = jwtDecode(jwt);
        return { ...user, id: user.userId };
    } catch (ex) {
        return null;
    }
}

export function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("currentPage");
}

export function loginWithJwt(jwt: any) {
    localStorage.setItem(tokenKey, jwt);
}
