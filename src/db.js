import Dexie from 'dexie';

// eslint-disable-next-line import/prefer-default-export
export const db = new Dexie('contactList');
db.version(1).stores({
  contacts: '++id, name, email, phone',
});
