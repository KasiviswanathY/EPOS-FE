export interface Locations {
  id: string; // Assuming each location has a unique ID
  name: string;
  address: string;
  city: string;
  country: string;
  pincode: string;
  description: string;
  status: "ACTIVE" | "INACTIVE"; // Enum-like restriction
  email: string;
  phone: string;
  language: string;
  timeZone: string;
  companyId: string;
}