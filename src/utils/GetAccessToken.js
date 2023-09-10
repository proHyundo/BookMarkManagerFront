export function getAccessToken() {
    const token = localStorage.getItem('userAccessToken');
    return token;
}

export function accessTokenLoader() {
    return getAccessToken();
}