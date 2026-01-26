import { Bus, Driver, Route, LiveBus, ChangeRequest } from '@/types/admin';

export const mockBuses: Bus[] = [
  { id: '1', busNumber: 'BUS-001', assignedDriverId: '1', assignedRouteId: '1', status: 'running' },
  { id: '2', busNumber: 'BUS-002', assignedDriverId: '2', assignedRouteId: '2', status: 'running' },
  { id: '3', busNumber: 'BUS-003', assignedDriverId: null, assignedRouteId: null, status: 'idle' },
  { id: '4', busNumber: 'BUS-004', assignedDriverId: '3', assignedRouteId: '3', status: 'running' },
  { id: '5', busNumber: 'BUS-005', assignedDriverId: null, assignedRouteId: null, status: 'idle' },
];

export const mockDrivers: Driver[] = [
  { id: '1', name: 'Rajesh Kumar', driverId: 'DRV-001', assignedBusId: '1', status: 'active', phone: '+91 98765 43210' },
  { id: '2', name: 'Suresh Patel', driverId: 'DRV-002', assignedBusId: '2', status: 'active', phone: '+91 98765 43211' },
  { id: '3', name: 'Amit Singh', driverId: 'DRV-003', assignedBusId: '4', status: 'active', phone: '+91 98765 43212' },
  { id: '4', name: 'Vikram Sharma', driverId: 'DRV-004', assignedBusId: null, status: 'inactive', phone: '+91 98765 43213' },
  { id: '5', name: 'Deepak Verma', driverId: 'DRV-005', assignedBusId: null, status: 'active', phone: '+91 98765 43214' },
];

export const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Route A - North Campus',
    startingPoint: 'College Main Gate',
    stops: [
      { id: '1-1', name: 'Sector 15 Market', order: 1 },
      { id: '1-2', name: 'Civil Lines', order: 2 },
      { id: '1-3', name: 'Railway Station', order: 3 },
      { id: '1-4', name: 'Bus Stand', order: 4 },
      { id: '1-5', name: 'Clock Tower', order: 5 },
    ],
  },
  {
    id: '2',
    name: 'Route B - South Campus',
    startingPoint: 'College Parking',
    stops: [
      { id: '2-1', name: 'IT Park Gate', order: 1 },
      { id: '2-2', name: 'Phase 8 Market', order: 2 },
      { id: '2-3', name: 'Industrial Area', order: 3 },
      { id: '2-4', name: 'Housing Board', order: 4 },
    ],
  },
  {
    id: '3',
    name: 'Route C - East Wing',
    startingPoint: 'College Main Gate',
    stops: [
      { id: '3-1', name: 'Sector 22 Market', order: 1 },
      { id: '3-2', name: 'PGI Hospital', order: 2 },
      { id: '3-3', name: 'Rock Garden', order: 3 },
    ],
  },
];

export const mockLiveBuses: LiveBus[] = [
  {
    id: '1',
    busNumber: 'BUS-001',
    driverName: 'Rajesh Kumar',
    routeName: 'Route A - North Campus',
    stops: [
      { id: '1-1', name: 'Sector 15 Market', order: 1, status: 'reached' },
      { id: '1-2', name: 'Civil Lines', order: 2, status: 'reached' },
      { id: '1-3', name: 'Railway Station', order: 3, status: 'current' },
      { id: '1-4', name: 'Bus Stand', order: 4, status: 'pending' },
      { id: '1-5', name: 'Clock Tower', order: 5, status: 'pending' },
    ],
  },
  {
    id: '2',
    busNumber: 'BUS-002',
    driverName: 'Suresh Patel',
    routeName: 'Route B - South Campus',
    stops: [
      { id: '2-1', name: 'IT Park Gate', order: 1, status: 'reached' },
      { id: '2-2', name: 'Phase 8 Market', order: 2, status: 'current' },
      { id: '2-3', name: 'Industrial Area', order: 3, status: 'pending' },
      { id: '2-4', name: 'Housing Board', order: 4, status: 'pending' },
    ],
  },
  {
    id: '4',
    busNumber: 'BUS-004',
    driverName: 'Amit Singh',
    routeName: 'Route C - East Wing',
    stops: [
      { id: '3-1', name: 'Sector 22 Market', order: 1, status: 'current' },
      { id: '3-2', name: 'PGI Hospital', order: 2, status: 'pending' },
      { id: '3-3', name: 'Rock Garden', order: 3, status: 'pending' },
    ],
  },
];

export const mockChangeRequests: ChangeRequest[] = [
  {
    id: '1',
    studentName: 'Priya Sharma',
    studentId: 'STU-2024-001',
    currentRoute: 'Route A - North Campus',
    currentStop: 'Railway Station',
    requestedRoute: 'Route B - South Campus',
    requestedStop: 'IT Park Gate',
    status: 'pending',
    requestedAt: '2024-01-15T10:30:00',
  },
  {
    id: '2',
    studentName: 'Rahul Mehta',
    studentId: 'STU-2024-045',
    currentRoute: 'Route B - South Campus',
    currentStop: 'Phase 8 Market',
    requestedRoute: 'Route A - North Campus',
    requestedStop: 'Civil Lines',
    status: 'pending',
    requestedAt: '2024-01-15T11:15:00',
  },
  {
    id: '3',
    studentName: 'Ananya Gupta',
    studentId: 'STU-2024-102',
    currentRoute: 'Route C - East Wing',
    currentStop: 'Rock Garden',
    requestedRoute: 'Route A - North Campus',
    requestedStop: 'Clock Tower',
    status: 'pending',
    requestedAt: '2024-01-15T09:45:00',
  },
];
