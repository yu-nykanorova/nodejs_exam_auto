import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type PasswordFormParams, SetPasswordForm } from "../components/forms/SetPasswordForm.tsx";
import { authService } from "../services/authService.ts";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";

export const SetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const { error, loading } = useAppSelector(
        ({ authSlice }) => authSlice,
    );

    const handleSetPassword = async ({ password }: PasswordFormParams) => {
        if (!token) {
            return;
        }
        await authService.setPassword({
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
            title="Create password"
            buttonText="Set password"
            loading={loading}
            error={error}
            onSubmit={handleSetPassword}
        />
    );
};