import { ClockingType } from "./ClockingType";
import { Location } from "./Location";
import { Staff } from "./Staff";

export interface StaffHours {
  id: string;
  date: string;
  clockingIn?: string;
  clockingOut?: string;
  notes?: string;

  clockingType: ClockingType;
  clockingTypeId: string;

  location: Location;
  locationId: string;

  staff: Staff;
  staffId: string;

  createdAt: string;
  updatedAt: string;
}
