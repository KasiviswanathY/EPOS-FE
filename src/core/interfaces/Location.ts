export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  pincode: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  email: string;
  phone: string;
  language: string;
  timeZone: string;
  companyId: string;
}
