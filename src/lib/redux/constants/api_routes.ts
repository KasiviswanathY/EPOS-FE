

const BASE_URL = "https://epos-be.onrender.com";

export const apiRoutes = {
  login: `${BASE_URL}/api/v1/login`,
  register: `${BASE_URL}/api/v1/register`,
  createUser: `${BASE_URL}/api/v1/users`,
  fetchUsers: `${BASE_URL}/api/v1/users`, 
  updateUser: (id: string) => `${BASE_URL}/api/v1/users/${id}`,
  deleteUser: (id: string) => `${BASE_URL}/api/v1/users/${id}`,
  createCompany:`${BASE_URL}/api/v1/companies/create`,
  // updateCompany:`${BASE_URL}/api/v1/company-receipts/${id}`
  createReceipts: `${BASE_URL}/api/v1/company-receipts`,
  createClock:`${BASE_URL}/api/v1/clocking-types`,
  getClock:`${BASE_URL}/api/v1/clocking-types`,
  updateClock:(id: string) => `${BASE_URL}/api/v1/clocking-types/${id}`,
  deletClock:(id: string) => `${BASE_URL}/api/v1/clocking-types/${id}`,
  createRole: `${BASE_URL}/api/v1/roles`,
  getRole:`${BASE_URL}/api/v1/roles`
  
};
