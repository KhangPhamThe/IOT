import { getCookieUserJWT } from 'utils/users.utils';
const DOMAIN_URL = "https://iot-backend-deploy.vercel.app/api";

export const userAPI = {
  onLogin: async (data: { email: string; password: string }) => {
    const url = "login";
    let formBody: string[] = [];

    for (let [key, value] of Object.entries(data)) {
      let encodedKey: string = encodeURIComponent(key);
      let encodedValue: string = encodeURIComponent(value);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    const encodedBody: string = formBody.join("&");

    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

    const rs = await fetch(`${DOMAIN_URL}/${url}`, {
      method: "POST",
      headers: requestHeader,
      body: encodedBody,
    });
    return rs.json();
  },

  createNewAccount: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatarURL?: string;
    role: string;
  }) => {
    const url = "admin/create-account";
    let formBody: string[] = [];

    for (let [key, value] of Object.entries(data)) {
      let encodedKey: string = encodeURIComponent(key);
      let encodedValue: string = encodeURIComponent(value);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    const encodedBody: string = formBody.join("&");

    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    requestHeader.set("auth-token", getCookieUserJWT() || '');

    console.log("call api createNewAccount")
    const rs = await fetch(`${DOMAIN_URL}/${url}`, {
      method: "POST",
      headers: requestHeader,
      body: encodedBody,
    });
    console.log("rs.json", rs.json)
    return rs.json();
  },

  getUserProfile: async (data: {
    jwt: string;
  }) => {
    const url = "get-user-profile";
    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("auth-token", data?.jwt || '');

    try {
      const rs = await fetch(`${DOMAIN_URL}/${url}`, {
        method: "GET",
        headers: requestHeader,
        mode: "cors",
      });
      return rs.json();
    } catch (error) {
      console.error(error);
    }
  },

  getAllUserProfile: async () => {
    const url = "admin/all-users";
    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("auth-token", getCookieUserJWT() || '');

    try {
      const rs = await fetch(`${DOMAIN_URL}/${url}`, {
        method: "GET",
        headers: requestHeader,
        mode: "cors",
      });
      return rs.json();
    } catch (error) {
      console.error(error);
    }
  },

  onLogOutAccount: async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expired_at");
  },    

  createNewSignalInOutDoor: async (data: {
    email: string;
  }) => {
    const url = "admin/create-in-out-door"

    const requestHeader: HeadersInit = new Headers();
    requestHeader.set('Content-Type', "application/json");
    requestHeader.set("auth-token", getCookieUserJWT() || '');

    try {
      const rs = await fetch(`${DOMAIN_URL}/${url}`, {
        method: "POST",      
        headers: requestHeader,
        body: JSON.stringify(data)
      })
      return rs.json();
    } catch (error) {
      console.error(error);
    }
  },

  getAllSignalInOutDoor: async () => {
    const url = "admin/get-all-in-out-door"
    try {
      const rs = await fetch(`${DOMAIN_URL}/${url}`)
      return rs.json();
    } catch (error) {
      console.error(error);
    }
  },

  getCountInOutDoor: async () => {
    const url = "admin/get-count-in-out-door"
    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("auth-token", getCookieUserJWT() || '');

    try {
      const rs = await fetch(`${DOMAIN_URL}/${url}`, {
        method: "GET",
        headers: requestHeader,
      })
      return rs.json();
    } catch (error) {
      console.error(error);
    }
  },

  getSignalInOutByEmail: async (data : {
    email: string
  }) => {
    const url = "admin/get-id-in-out-door"
    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("auth-token", getCookieUserJWT() || '');
    try {
      const rs = await fetch(`${DOMAIN_URL}/${url}?email=${data.email}`, {
        method: "GET",
        headers: requestHeader,
      })
      return rs.json();
    } catch (error) {
      console.error(error);
    }
  }
};
