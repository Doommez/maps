export default {
  set(name, value, days = 1) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value ?? ''}${expires}; path=/`;
  },
  get(name) {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${ name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') }=([^;]*)`,
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },
  delete(name) {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
  },
};
