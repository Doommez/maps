import {ref, watch} from 'vue';
import {useAuth} from './useAuth';
import {PERMISSIONS} from '../constants/permissions';

const {user} = useAuth();
const userPermissions = ref(null);
export const usePermissions = () => {
  const can = (...permissions) => permissions.every((permission) => userPermissions.value.includes(permission));

  watch(() => user, (newUser) => {
    const role = newUser.value.role.toLocaleLowerCase();
    userPermissions.value = PERMISSIONS.reduce((result, permission) => {
      if (permission.roles.includes(role)) {
        result.push(...permission.key);
      }
      return result;
    }, []);
  }, {
    immediate: true,
    deep: true,
  });

  return {
    can,
    userPermissions,
  };
};

