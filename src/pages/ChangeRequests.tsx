import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, ArrowDown } from 'lucide-react';
import { ChangeRequest, RequestStatus } from '@/types/admin';
import { mockChangeRequests } from '@/data/mockData';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { cn } from '@/lib/utils';

export default function ChangeRequests() {
  const [requests, setRequests] = useState<ChangeRequest[]>(mockChangeRequests);
  const [selectedRequest, setSelectedRequest] = useState<ChangeRequest | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  const handleAction = (request: ChangeRequest, actionType: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setAction(actionType);
  };

  const confirmAction = () => {
    if (!selectedRequest || !action) return;

    setRequests(requests.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' as RequestStatus }
        : r
    ));
    setSelectedRequest(null);
    setAction(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <AdminLayout
      title="Change Requests"
      subtitle="Student route change requests"
    >
      {/* Pending Requests */}
      <div className="mb-6 lg:mb-8">
        <h2 className="font-heading text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Pending Requests ({pendingRequests.length})
        </h2>

        {pendingRequests.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block table-wrapper overflow-hidden">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Current Assignment</th>
                    <th></th>
                    <th>Requested</th>
                    <th>Requested At</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <div>
                          <p className="font-medium">{request.studentName}</p>
                          <p className="text-xs text-muted-foreground">{request.studentId}</p>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p className="text-sm">{request.currentRoute}</p>
                          <p className="text-xs text-muted-foreground">{request.currentStop}</p>
                        </div>
                      </td>
                      <td>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </td>
                      <td>
                        <div>
                          <p className="text-sm">{request.requestedRoute}</p>
                          <p className="text-xs text-muted-foreground">{request.requestedStop}</p>
                        </div>
                      </td>
                      <td className="text-sm text-muted-foreground">
                        {formatDate(request.requestedAt)}
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAction(request, 'approve')}
                            className="bg-success hover:bg-success/90"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAction(request, 'reject')}
                            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <X className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="rounded-lg border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-medium text-sm">{request.studentName}</p>
                      <p className="text-xs text-muted-foreground">{request.studentId}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatDateShort(request.requestedAt)}</p>
                  </div>

                  {/* Route Change Visual */}
                  <div className="bg-muted/30 rounded-lg p-3 mb-3">
                    <div className="flex flex-col gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">From</p>
                        <p className="text-sm font-medium">{request.currentRoute}</p>
                        <p className="text-xs text-muted-foreground">{request.currentStop}</p>
                      </div>
                      <div className="flex justify-center">
                        <ArrowDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">To</p>
                        <p className="text-sm font-medium">{request.requestedRoute}</p>
                        <p className="text-xs text-muted-foreground">{request.requestedStop}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAction(request, 'approve')}
                      className="flex-1 bg-success hover:bg-success/90"
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(request, 'reject')}
                      className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-lg border bg-card p-6 lg:p-8 text-center">
            <p className="text-muted-foreground text-sm">No pending requests</p>
          </div>
        )}
      </div>

      {/* Request History */}
      <div>
        <h2 className="font-heading text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Request History
        </h2>

        {/* Desktop Table View */}
        <div className="hidden lg:block table-wrapper overflow-hidden">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Requested At</th>
              </tr>
            </thead>
            <tbody>
              {processedRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div>
                      <p className="font-medium">{request.studentName}</p>
                      <p className="text-xs text-muted-foreground">{request.studentId}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm">{request.currentRoute}</p>
                      <p className="text-xs text-muted-foreground">{request.currentStop}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm">{request.requestedRoute}</p>
                      <p className="text-xs text-muted-foreground">{request.requestedStop}</p>
                    </div>
                  </td>
                  <td>
                    <span className={cn(
                      'status-badge',
                      request.status === 'approved' && 'status-active',
                      request.status === 'rejected' && 'bg-destructive/10 text-destructive'
                    )}>
                      {request.status === 'approved' && <span className="w-2 h-2 rounded-full bg-success" />}
                      {request.status === 'rejected' && <span className="w-2 h-2 rounded-full bg-destructive" />}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="text-sm text-muted-foreground">
                    {formatDate(request.requestedAt)}
                  </td>
                </tr>
              ))}
              {processedRequests.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-muted-foreground">
                    No processed requests yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          {processedRequests.length > 0 ? (
            processedRequests.map((request) => (
              <div key={request.id} className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="font-medium text-sm">{request.studentName}</p>
                    <p className="text-xs text-muted-foreground">{request.studentId}</p>
                  </div>
                  <span className={cn(
                    'status-badge',
                    request.status === 'approved' && 'status-active',
                    request.status === 'rejected' && 'bg-destructive/10 text-destructive'
                  )}>
                    {request.status === 'approved' && <span className="w-2 h-2 rounded-full bg-success" />}
                    {request.status === 'rejected' && <span className="w-2 h-2 rounded-full bg-destructive" />}
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><span className="font-medium text-foreground">From:</span> {request.currentStop}</p>
                  <p><span className="font-medium text-foreground">To:</span> {request.requestedStop}</p>
                  <p className="pt-1">{formatDateShort(request.requestedAt)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border bg-card p-6 text-center">
              <p className="text-muted-foreground text-sm">No processed requests yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={!!selectedRequest && !!action}
        onOpenChange={() => {
          setSelectedRequest(null);
          setAction(null);
        }}
        title={action === 'approve' ? 'Approve Request' : 'Reject Request'}
        description={
          action === 'approve'
            ? `Are you sure you want to approve ${selectedRequest?.studentName}'s request to change from ${selectedRequest?.currentStop} to ${selectedRequest?.requestedStop}?`
            : `Are you sure you want to reject ${selectedRequest?.studentName}'s request?`
        }
        confirmLabel={action === 'approve' ? 'Approve' : 'Reject'}
        onConfirm={confirmAction}
        variant={action === 'reject' ? 'destructive' : 'default'}
      />
    </AdminLayout>
  );
}
