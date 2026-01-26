import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, UserX, Phone } from 'lucide-react';
import { Driver, DriverStatus } from '@/types/admin';
import { mockDrivers, mockBuses } from '@/data/mockData';

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    driverId: '',
    phone: '',
    status: 'active' as DriverStatus,
    password: '',
  });

  const getBusNumber = (busId: string | null) => {
    if (!busId) return '—';
    const bus = mockBuses.find(b => b.id === busId);
    return bus?.busNumber || '—';
  };

  const isDriverOnRunningBus = (driver: Driver) => {
    if (!driver.assignedBusId) return false;
    const bus = mockBuses.find(b => b.id === driver.assignedBusId);
    return bus?.status === 'running';
  };

  const handleAdd = () => {
    setSelectedDriver(null);
    setFormData({ name: '', driverId: '', phone: '', status: 'active', password: '' });
    setIsFormOpen(true);
  };

  const handleEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setFormData({
      name: driver.name,
      driverId: driver.driverId,
      phone: driver.phone || '',
      status: driver.status,
      password: '',
    });
    setIsFormOpen(true);
  };

  const handleDeactivate = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDeactivateOpen(true);
  };

  const handleSave = () => {
    if (selectedDriver) {
      setDrivers(drivers.map(d =>
        d.id === selectedDriver.id
          ? {
            ...d,
            name: formData.name,
            driverId: formData.driverId,
            phone: formData.phone,
            status: formData.status,
          }
          : d
      ));
    } else {
      const newDriver: Driver = {
        id: String(Date.now()),
        name: formData.name,
        driverId: formData.driverId,
        phone: formData.phone,
        assignedBusId: null,
        status: formData.status,
      };
      setDrivers([...drivers, newDriver]);
    }
    setIsFormOpen(false);
  };

  const confirmDeactivate = () => {
    if (selectedDriver) {
      setDrivers(drivers.map(d =>
        d.id === selectedDriver.id
          ? { ...d, status: 'inactive' as DriverStatus }
          : d
      ));
    }
    setIsDeactivateOpen(false);
  };

  return (
    <AdminLayout
      title="Drivers Management"
      subtitle="Manage drivers who will log in"
      actions={
        <Button onClick={handleAdd} size="sm" className="sm:size-default">
          <Plus className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Add Driver</span>
        </Button>
      }
    >
      {/* Desktop Table View */}
      <div className="hidden sm:block table-wrapper overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Driver ID</th>
              <th className="hidden md:table-cell">Phone</th>
              <th className="hidden lg:table-cell">Assigned Bus</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="font-medium">{driver.name}</td>
                <td>{driver.driverId}</td>
                <td className="hidden md:table-cell">{driver.phone || '—'}</td>
                <td className="hidden lg:table-cell">{getBusNumber(driver.assignedBusId)}</td>
                <td>
                  <StatusBadge status={driver.status} />
                </td>
                <td>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(driver)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {driver.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeactivate(driver)}
                        className="text-destructive hover:text-destructive"
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {drivers.map((driver) => (
          <div key={driver.id} className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-medium text-sm">{driver.name}</h3>
                  <StatusBadge status={driver.status} />
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p className="font-mono">{driver.driverId}</p>
                  {driver.phone && (
                    <p className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3" />
                      {driver.phone}
                    </p>
                  )}
                  <p>
                    <span className="font-medium text-foreground">Bus:</span> {getBusNumber(driver.assignedBusId)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(driver)} className="h-8 w-8 p-0">
                  <Pencil className="h-4 w-4" />
                </Button>
                {driver.status === 'active' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeactivate(driver)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md max-w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {selectedDriver ? 'Edit Driver' : 'Add New Driver'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {selectedDriver ? 'Edit the selected driver details' : 'Add a new driver to the system'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Driver Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Rajesh Kumar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driverId">Driver ID</Label>
              <Input
                id="driverId"
                value={formData.driverId}
                onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                placeholder="e.g., DRV-006"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g., +91 98765 43210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                {selectedDriver ? 'Reset Password' : 'Password'}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={selectedDriver ? 'Leave blank to keep current' : 'Enter password'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as DriverStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsFormOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!formData.name || !formData.driverId} className="w-full sm:w-auto">
              {selectedDriver ? 'Save Changes' : 'Add Driver'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate Confirmation */}
      <ConfirmDialog
        open={isDeactivateOpen}
        onOpenChange={setIsDeactivateOpen}
        title="Deactivate Driver"
        description={
          selectedDriver && isDriverOnRunningBus(selectedDriver)
            ? `Warning: ${selectedDriver.name} is currently assigned to a running bus. Deactivating will not stop the bus. Are you sure?`
            : `Are you sure you want to deactivate ${selectedDriver?.name}? They will no longer be able to log in.`
        }
        confirmLabel="Deactivate"
        onConfirm={confirmDeactivate}
        variant="destructive"
      />
    </AdminLayout>
  );
}
