const DOMAIN_URL = "https://iot-system-bk123.herokuapp.com/api";

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
    const rs = await fetch(`${DOMAIN_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
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
    const rs = await fetch(`${DOMAIN_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodedBody,
    });
    return rs.json();
  },
};
