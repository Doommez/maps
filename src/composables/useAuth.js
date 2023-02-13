import {shallowRef} from 'vue';
import cookie from '../services/cookie';
import {readRole, signIn} from '../api/apiUser';

const user = shallowRef({
  role: '',
  isAuthorized: false,
});

export const useAuth = () => {
  const whoIAm = async () => {
    if (!cookie.get('jwt')) {
      user.value.isAuthorized = false;
    } else {
      user.value.role = await readRole();
      user.value.isAuthorized = true;
    }
  };

  const login = async ({data, router}) => {
    const token = await signIn(data);
    cookie.set('jwt', token);
    await whoIAm();
    if (router.currentRoute.value.query.nextUrl) {
      router.push({path: router.currentRoute.value.query.nextUrl});
      return;
    }
    router.push({name: 'booking'});
  };

  const logout = (router) => {
    cookie.delete('jwt');
    user.value.isAuthorized = false;
    user.value.role = '';
    router.push({name: 'login'});
  };

  return {
    user,
    login,
    logout,
    whoIAm,
  };
};

