export default function authHeader() {
    const Authorization = localStorage.getItem("Authorization")

    if (Authorization) {
        return { 'Authorization': Authorization };
    } else {
        return {};
    }
}