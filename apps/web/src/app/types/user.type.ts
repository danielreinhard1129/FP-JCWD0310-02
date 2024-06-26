export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  employee?: {
    warehouseId: number;
    warehouse: string;
  };
}
