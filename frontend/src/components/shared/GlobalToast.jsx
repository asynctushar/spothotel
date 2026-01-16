import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { clearError, clearSuccess } from "@/redux/slices/app.slice";

const GlobalToast = () => {
    const dispatch = useDispatch();
    const { error, success } = useSelector((state) => state.appState);

    const handleClearError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleClearSuccess = useCallback(() => {
        dispatch(clearSuccess());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                onDismiss: handleClearError,
                onAutoClose: handleClearError,
            });
        }
    }, [error, handleClearError]);

    useEffect(() => {
        if (success) {
            toast.success(success, {
                onDismiss: handleClearSuccess,
                onAutoClose: handleClearSuccess,
            });
        }
    }, [success, handleClearSuccess]);

    return null; // no UI
};

export default GlobalToast;
