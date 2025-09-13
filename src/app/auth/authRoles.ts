const authRoles = {
  admin: ['ADMIN'],
  volunteer: ['VOLUNTEER'],
  ong: ['ONG'],
  user: ['VOLUNTEER', 'ONG'], // qualquer usuário logado (voluntário ou ONG)
  guest: [], // rota aberta
};

export default authRoles;
