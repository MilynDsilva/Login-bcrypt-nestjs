login = db.getSiblingDB('login');
login.createUser({
  user: 'login',
  pwd: 'login',
  roles: [{ role: 'readWrite', db: 'login' }],
});
login.createCollection('logins');
login.createCollection('sign-ups');