import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/StatCard';
import { Bus, Users, Route, Radio } from 'lucide-react';
import { mockBuses, mockDrivers, mockRoutes, mockLiveBuses } from '@/data/mockData';

export default function Dashboard() {
  const totalBuses = mockBuses.length;
  const activeBuses = mockBuses.filter(b => b.status === 'running').length;
  const totalDrivers = mockDrivers.length;
  const activeDrivers = mockDrivers.filter(d => d.status === 'active').length;
  const totalRoutes = mockRoutes.length;
  const runningRoutes = mockLiveBuses.length;

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Overview of your transport system"
    >
      {/* Stats Grid - Responsive */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Buses"
          value={totalBuses}
          icon={Bus}
          description={`${activeBuses} currently running`}
          variant="primary"
        />
        <StatCard
          title="Active Drivers"
          value={activeDrivers}
          icon={Users}
          description={`${totalDrivers} total drivers`}
          variant="success"
        />
        <StatCard
          title="Total Routes"
          value={totalRoutes}
          icon={Route}
          description="Configured routes"
        />
        <StatCard
          title="Routes Running"
          value={runningRoutes}
          icon={Radio}
          description="Active right now"
          variant="success"
        />
      </div>

      {/* Quick Status Section */}
      <div className="mt-6 sm:mt-8">
        <h2 className="font-heading text-base sm:text-lg font-semibold mb-3 sm:mb-4">System Status</h2>
        <div className="rounded-lg border bg-card p-4 sm:p-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">System Online</p>
                <p className="text-xs text-muted-foreground truncate">All services operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <Bus className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{activeBuses} Buses Active</p>
                <p className="text-xs text-muted-foreground truncate">On scheduled routes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 flex-shrink-0">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{activeDrivers} Drivers Online</p>
                <p className="text-xs text-muted-foreground truncate">Currently on duty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Buses Table */}
      <div className="mt-6 sm:mt-8">
        <h2 className="font-heading text-base sm:text-lg font-semibold mb-3 sm:mb-4">Currently Running Buses</h2>
        <div className="table-wrapper overflow-hidden">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Bus Number</th>
                <th>Driver</th>
                <th className="hidden sm:table-cell">Route</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockLiveBuses.map((bus) => (
                <tr key={bus.id}>
                  <td className="font-medium">{bus.busNumber}</td>
                  <td className="max-w-[100px] sm:max-w-none truncate">{bus.driverName}</td>
                  <td className="hidden sm:table-cell">{bus.routeName}</td>
                  <td>
                    <span className="status-badge status-running">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      <span className="hidden xs:inline">Running</span>
                      <span className="xs:hidden">●</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile hint for scrollable table */}
        <p className="text-xs text-muted-foreground mt-2 sm:hidden text-center">
          ← Swipe to see more →
        </p>
      </div>
    </AdminLayout>
  );
}
