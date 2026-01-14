import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Pencil } from 'lucide-react';
import { useChangeUserRoleMutation, useUsersQuery } from "@/redux/api/user.api";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
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
import UsersLoader from '@/components/user/UsersLoader';

const Users = () => {
  const { user } = useSelector((state) => state.authState);
  const { isLoading, data } = useUsersQuery();
  const [changeUserRole] = useChangeUserRoleMutation();

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [userRef, setUserRef] = useState(undefined);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const totalPages = Math.ceil((data?.users?.length || 0) / rowsPerPage);
  const currentUsers = data?.users?.slice(page * rowsPerPage, (page + 1) * rowsPerPage) || [];

  const editHandler = () => {
    changeUserRole({ id: userRef._id, role });
    setOpen(false);
    setUserRef(undefined);
  };

  const getRoleVariant = (role) => {
    return role === 'admin' ? 'default' : 'secondary';
  };

  if (isLoading) {
    return <UsersLoader />;
  }

  return (
    <Fragment>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Users</h1>
          <p className="text-foreground/75 mt-2">View and manage all users in the system</p>
        </div>

        {!data?.users || data.users.length === 0 ? (
          <Card className="shadow-lg border-0" style={{ minHeight: '500px' }}>
            <CardContent className="flex flex-col items-center justify-center py-16" style={{ minHeight: '500px' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Users Yet</h3>
              <p className="text-gray-600 mb-6">There are no users in the system</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-0 overflow-hidden py-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary text-primary-foreground border-b">
                      <th className="text-left px-6 py-4 font-semibold">User ID</th>
                      <th className="text-left px-6 py-4 font-semibold">Name</th>
                      <th className="text-left px-6 py-4 font-semibold">Email</th>
                      <th className="text-left px-6 py-4 font-semibold">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((singleUser) => (
                      <tr key={singleUser._id} className="border-b hover:bg-gray-50 transition-colors" style={{ height: '72px' }}>
                        <td className="px-6 py-4 font-mono text-sm">
                          {singleUser._id}
                        </td>
                        <td className="px-6 py-4 font-medium">
                          {singleUser.name}
                        </td>
                        <td className="px-6 py-4 text-foreground/75">
                          {singleUser.email}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Badge variant={getRoleVariant(singleUser.role)} className="capitalize">
                              {singleUser.role}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 cursor-pointer"
                              onClick={() => {
                                setOpen(true);
                                setUserRef(singleUser);
                                setRole(singleUser.role);
                              }}
                              disabled={singleUser._id === user._id}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {Array.from({ length: rowsPerPage - currentUsers.length }).map((_, i) => (
                      <tr key={`empty-${i}`} style={{ height: '72px' }}>
                        <td colSpan={4} className="px-6 py-4"></td>
                      </tr>
                    ))}
                  </tbody>
                  {totalPages > 1 && (
                    <tfoot>
                      <tr className="border-t bg-gray-50">
                        <td colSpan={4} className="px-6 py-4">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-600">
                              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, data.users.length)} of {data.users.length} users
                            </p>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                className="cursor-pointer"
                                size="sm"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 0}
                              >
                                Previous
                              </Button>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                  let pageNum;
                                  if (totalPages <= 5) {
                                    pageNum = i;
                                  } else if (page < 3) {
                                    pageNum = i;
                                  } else if (page > totalPages - 4) {
                                    pageNum = totalPages - 5 + i;
                                  } else {
                                    pageNum = page - 2 + i;
                                  }
                                  return (
                                    <Button
                                      key={i}
                                      variant={page === pageNum ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => setPage(pageNum)}
                                      className="w-10 h-10 cursor-pointer"
                                    >
                                      {pageNum + 1}
                                    </Button>
                                  );
                                })}
                              </div>
                              <Button
                                variant="outline"
                                className="cursor-pointer"
                                size="sm"
                                onClick={() => setPage(page + 1)}
                                disabled={page >= totalPages - 1}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User's Role</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              onClick={editHandler}
              disabled={role === userRef?.role}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Users;