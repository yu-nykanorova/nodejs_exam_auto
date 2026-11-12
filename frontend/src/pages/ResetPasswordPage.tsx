import { authService } from "../services/authService.ts";
import { type PasswordFormParams, SetPasswordForm } from "../components/forms/SetPasswordForm.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";

export const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const { error, loading } = useAppSelector(
        ({ authSlice }) => authSlice,
    );

    const handleResetPassword = async ({ password }: PasswordFormParams) => {
        if (!token) {
            return;
        }

        await authService.resetPassword({
            password,
            token,
        });

        navigate("/login");
    };

    if (!token) {
        return <ErrorComponent message="Invalid or missing action token" />
    }

    return (
        <SetPasswordForm
            title="Reset password"
            buttonText="Reset password"
            loading={loading}
            error={error}
            onSubmit={handleResetPassword}
        />
    );
};