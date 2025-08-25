interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  role?: string;
  createdon?: string;
  status?: string;
  description?: string;
  password?:string;
  permissions?: string[];
}
