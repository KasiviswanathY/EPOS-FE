import { config } from "@/config";

const BASE_URL = config.API_URL;

export const apiRoutes = {
  login: `${BASE_URL}/login`,
  register: `${BASE_URL}/register`,
  companyReceipts: `${BASE_URL}/company-receipts`,
  users: `${BASE_URL}/users`,
  companies: `${BASE_URL}/companies`,
  clockingTypes: `${BASE_URL}/clocking-types`,
  roles: `${BASE_URL}/roles`,
  locations: `${BASE_URL}/locations`,
};
