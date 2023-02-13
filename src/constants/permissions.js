import {ROLES} from './roles';

export const READ_BOOKING = 'readBooking';
export const READ_MANAGEMENT = 'readManagement';
export const UPDATE_MANAGEMENT = 'updateManagement';

export const PERMISSIONS = [
  {
    key: [READ_BOOKING],
    roles: [ROLES.user, ROLES.admin],
  },
  {
    key: [READ_MANAGEMENT],
    roles: [ROLES.admin],
  },
  {
    key: [UPDATE_MANAGEMENT],
    roles: [ROLES.admin],
  },
];
