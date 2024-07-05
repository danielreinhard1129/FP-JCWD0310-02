export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isVerify?: boolean;
  employee?: {
    warehouseId: number;
    warehouse: string;
  };
}
