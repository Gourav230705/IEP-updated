export default function getUserFromStorage() {
    const token = JSON.parse(localStorage.getItem('userInfo') || null) 
    return token?.token;
}
