export enum StaffStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  status: StaffStatus;
  companyId: string;
  locationId?: string;
  createdAt?: string;
  updatedAt?: string;
}
