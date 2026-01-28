export type BusStatus = 'idle' | 'running';
export type DriverStatus = 'active' | 'inactive';
export type StopStatus = 'reached' | 'current' | 'pending';
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface Bus {
  id: string;
  busNumber: string;
  assignedDriverId: string | null;
  assignedRouteId: string | null;
  status: BusStatus;
}

export interface Driver {
  id: string;
  name: string;
  driverId: string;
  assignedBusId: string | null;
  status: DriverStatus;
  phone?: string;
  password?: string;
}

export interface Stop {
  id: string;
  name: string;
  order: number;
}

export interface Route {
  id: string;
  name: string;
  startingPoint: string;
  stops: Stop[];
}

export interface LiveBus {
  id: string;
  busNumber: string;
  driverName: string;
  routeName: string;
  stops: Array<Stop & { status: StopStatus }>;
}

export interface ChangeRequest {
  id: string;
  studentName: string;
  studentId: string;
  currentRoute: string;
  currentStop: string;
  requestedRoute: string;
  requestedStop: string;
  status: RequestStatus;
  requestedAt: string;
}

export type StudentYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
export type StudentStatus = 'active' | 'inactive';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  year: StudentYear;
  department: string;
  password: string;
  routeId?: string | null;
  stopId?: string | null;
  routeName?: string | null;
  stopName?: string | null;
  status: StudentStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
