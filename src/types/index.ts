export type UserRole = 'employee' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  managerId?: string;
  department: string;
}

export type GoalStatus = 'draft' | 'pending' | 'approved' | 'rework';

export interface Goal {
  id: string;
  userId: string;
  thrustArea: string;
  title: string;
  description: string;
  unit: string;
  target: number | string;
  weightage: number;
  status: GoalStatus;
  managerComment?: string;
  currentValue: number;
  lastUpdated: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  details: string;
}
