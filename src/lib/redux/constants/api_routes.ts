

const BASE_URL = "https://epos-be.onrender.com";

export const apiRoutes = {
  login: `${BASE_URL}/api/v1/login`,
  register: `${BASE_URL}/api/v1/register`,
  createUser: `${BASE_URL}/api/v1/users`,
  createCompany:`${BASE_URL}/api/v1/companies/create`,
  // updateCompany:`${BASE_URL}/api/v1/company-receipts/${id}`
  createReceipts: `${BASE_URL}/api/v1/company-receipts`,
  
};
