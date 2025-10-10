export enum StaffStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

import { Role } from "./Role";
import { Location } from "./Location";
import { Order } from "./Order";
import { StockMovement } from "./StockMovement";
import { StaffHours } from "./StaffHours";

export interface Staff {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE" | string;
  availableForAllLocations: boolean;
  passcode?: string;
  swipeLogin?: string;
  hourlyRate?: number;
  isDeleted: boolean;

  role: Role;
  roleId: string;

  mainLocation: Location;
  mainLocationId: string;

  processedOrders?: Order[];
  stockMovements?: StockMovement[];

  createdAt: string;
  updatedAt: string;
  StaffHours?: StaffHours;
}
