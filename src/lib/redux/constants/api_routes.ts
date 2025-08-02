

const BASE_URL = "https://epos-be.onrender.com";

export const apiRoutes = {
  login: `${BASE_URL}/api/v1/login`,
  register: `${BASE_URL}/api/v1/register`,
  createUser: `${BASE_URL}/api/v1/users`,
  fetchUsers: `${BASE_URL}/api/v1/users`, 
  updateUser: (id: string) => `${BASE_URL}/api/v1/users/${id}`,
};
