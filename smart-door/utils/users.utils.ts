export const getCookieUserJWT = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        return localStorage.getItem("access_token");
      }
    return ''
}