import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Trash2, Eye, EyeOff } from 'lucide-react';
import { changePassword, deleteProfile, updateProfile } from '../redux/actions/auth.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { validateEmail } from '@/lib/validations';

const Settings = () => {
    const { user, loading } = useSelector((state) => state.authState);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNameOpen, setIsNameOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '', oldPassword: '', newPassword: '', confirmPassword: '' });
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const validateNameForm = () => {
        if (!name.trim()) {
            setErrors({ ...errors, name: 'Name is required' });
            return false;
        }
        if (name.trim().length < 2) {
            setErrors({ ...errors, name: 'Name must be at least 2 characters' });
            return false;
        }
        setErrors({ ...errors, name: '' });
        return true;
    };

    const validateEmailForm = () => {
        if (!email.trim()) {
            setErrors({ ...errors, email: 'Email is required' });
            return false;
        }
        if (!validateEmail(email)) {
            setErrors({ ...errors, email: 'Please enter a valid email' });
            return false;
        }
        setErrors({ ...errors, email: '' });
        return true;
    };

    const validatePasswordForm = () => {
        const newErrors = { oldPassword: '', newPassword: '', confirmPassword: '' };
        let isValid = true;

        if (!oldPassword.trim()) {
            newErrors.oldPassword = 'Current password is required';
            isValid = false;
        } else if (oldPassword.length < 6) {
            newErrors.oldPassword = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!newPassword.trim()) {
            newErrors.newPassword = 'New password is required';
            isValid = false;
        } else if (newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors({ ...errors, ...newErrors });
        return isValid;
    };

    const changeNameHandler = async () => {
        if (!validateNameForm()) return;

        const res = await dispatch(updateProfile({ name }));
        if (res.type === "auth/updateProfile/fulfilled") {
            setIsNameOpen(false);
            setErrors({ ...errors, name: '' });
        }
    };

    const changeEmailHandler = async () => {
        if (!validateEmailForm()) return;

        const res = await dispatch(updateProfile({ email }));
        if (res.type === "auth/updateProfile/fulfilled") {
            setIsEmailOpen(false);
            setErrors({ ...errors, email: '' });
        }
    };

    const changePasswordHandler = async () => {
        if (!validatePasswordForm()) return;

        const res = await dispatch(changePassword({ oldPassword, newPassword }));
        if (res.type === "auth/changePassword/fulfilled") {
            setIsPasswordOpen(false);
            setNewPassword("");
            setOldPassword("");
            setConfirmPassword("");
            setErrors({ ...errors, oldPassword: '', newPassword: '', confirmPassword: '' });
        }
    };

    const deleteAccountHandler = async () => {
        const res = await dispatch(deleteProfile());
        if (res.type === "auth/deleteProfile/fulfilled") {
            setIsDeleteOpen(false);
        }
    };

    const handleNameDialogClose = () => {
        setIsNameOpen(false);
        setName(user?.name || '');
        setErrors({ ...errors, name: '' });
    };

    const handleEmailDialogClose = () => {
        setIsEmailOpen(false);
        setEmail(user?.email || '');
        setErrors({ ...errors, email: '' });
    };

    const handlePasswordDialogClose = () => {
        setIsPasswordOpen(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors({ ...errors, oldPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="min-h-screen bg-background pb-16">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-4">
                <Link to="/account" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Account</span>
                </Link>

                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
                    <p className="text-foreground/75 mt-2">Manage your account information and preferences</p>
                </div>

                <div className="space-y-4">
                    {/* Personal Information Card */}
                    <Card className="shadow-md border-0">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                                        <User className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-600">Name</p>
                                        <p className="font-semibold capitalize truncate">{user?.name}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => setIsNameOpen(true)} className="shrink-0 cursor-pointer">
                                    Edit
                                </Button>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                                        <Mail className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-600">Email</p>
                                        <p className="font-semibold truncate">{user?.email}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => setIsEmailOpen(true)} className="shrink-0 cursor-pointer">
                                    Edit
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Card */}
                    <Card className="shadow-md border-0">
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Manage your password and account security</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    <div className="p-2 bg-green-100 rounded-lg shrink-0">
                                        <Lock className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold">Password</p>
                                        <p className="text-sm text-gray-600">Change your password</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => setIsPasswordOpen(true)} className="shrink-0 cursor-pointer">
                                    Change
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Danger Zone Card */}
                    <Card className="shadow-md border-0 border-red-200">
                        <CardHeader>
                            <CardTitle className="text-red-600">Danger Zone</CardTitle>
                            <CardDescription>Irreversible actions for your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-red-200 bg-red-50/50">
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    <div className="p-2 bg-red-100 rounded-lg shrink-0">
                                        <Trash2 className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-red-700">Delete Account</p>
                                        <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                                    </div>
                                </div>
                                <Button variant="destructive" size="sm" onClick={() => setIsDeleteOpen(true)} className="shrink-0 cursor-pointer">
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Name Dialog */}
                <Dialog open={isNameOpen} >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Change Your Name</DialogTitle>
                            <DialogDescription>Update your display name</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setErrors({ ...errors, name: '' });
                                    }}
                                    className="pl-10"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button className="cursor-pointer" variant="outline" onClick={handleNameDialogClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button className="cursor-pointer" onClick={changeNameHandler} disabled={loading}>
                                {loading ? 'Updating...' : 'Update'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Email Dialog */}
                <Dialog open={isEmailOpen} >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Change Your Email</DialogTitle>
                            <DialogDescription>Update your email address</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors({ ...errors, email: '' });
                                    }}
                                    className="pl-10"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button className="cursor-pointer" variant="outline" onClick={handleEmailDialogClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button className="cursor-pointer" onClick={changeEmailHandler} disabled={loading}>
                                {loading ? 'Updating...' : 'Update'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Password Dialog */}
                <Dialog open={isPasswordOpen} >
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Change Your Password</DialogTitle>
                            <DialogDescription>Enter your current password and choose a new one</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="oldPassword">Current Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="oldPassword"
                                        type={showOldPassword ? "text" : "password"}
                                        placeholder="Enter current password"
                                        value={oldPassword}
                                        onChange={(e) => {
                                            setOldPassword(e.target.value);
                                            setErrors({ ...errors, oldPassword: '' });
                                        }}
                                        className="pl-10 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                    >
                                        {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.oldPassword && (
                                    <p className="text-sm text-destructive">{errors.oldPassword}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                            setErrors({ ...errors, newPassword: '' });
                                        }}
                                        className="pl-10 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                    >
                                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-sm text-destructive">{errors.newPassword}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setErrors({ ...errors, confirmPassword: '' });
                                        }}
                                        className="pl-10 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button className="cursor-pointer" variant="outline" onClick={handlePasswordDialogClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button className="cursor-pointer" onClick={changePasswordHandler} disabled={loading}>
                                {loading ? 'Updating...' : 'Update Password'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Account Dialog */}
                <Dialog open={isDeleteOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-red-600">Delete Your Account?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove all your data including bookings.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" className="cursor-pointer" onClick={() => setIsDeleteOpen(false)} disabled={loading}>
                                Cancel
                            </Button>
                            <Button variant="destructive" className="cursor-pointer" onClick={deleteAccountHandler} disabled={loading}>
                                {loading ? 'Deleting...' : 'Delete Account'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Settings;