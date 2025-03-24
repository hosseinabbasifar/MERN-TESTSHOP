import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@email.com',
    password: bcrypt.hashSync('12345678', 10),
    isAdmin: true,
  },
  {
    name: 'Karl',
    email: 'Karl@email.com',
    password: bcrypt.hashSync('12345678', 10),
  },
  {
    name: 'Emilia',
    email: 'Emilia@email.com',
    password: bcrypt.hashSync('12345678', 10),
  },
];

export default users;
