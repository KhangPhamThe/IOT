export const getCookieUserJWT = () => {
  if (typeof window !== 'undefined') {
      // Perform localStorage action
      return localStorage.getItem("access_token");
    }
  return ''
}

export const checkExpiredToken = () => {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const expired_at = localStorage.getItem("expired_at");
    if (expired_at) {
      const now = new Date();
      if (now >= new Date(expired_at)) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expired_at");
      }
    }
  }
}

export const validateAvatar = (url: any) => {
  if (!url) return "https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.18169-9/27858226_2002217240039299_3532918632429742634_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=djLKM2VBJWQAX9oqQA0&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfAcNerg8QvUUQVU8cmz4ygPrQwAMkSaiLsXDjWzveht4w&oe=63BCE77C";
  if (url.indexOf("https://") === 0) return url;
  return "https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.18169-9/27858226_2002217240039299_3532918632429742634_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=djLKM2VBJWQAX9oqQA0&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfAcNerg8QvUUQVU8cmz4ygPrQwAMkSaiLsXDjWzveht4w&oe=63BCE77C";
}