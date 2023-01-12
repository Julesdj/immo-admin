import jwt_decode from "jwt-decode";
const tokenKey = "token";

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = getJwt();
        return jwt_decode(jwt);
    } catch (err) {
        return null;
    }
}

export function logout() {
    localStorage.removeItem(tokenKey);
}
