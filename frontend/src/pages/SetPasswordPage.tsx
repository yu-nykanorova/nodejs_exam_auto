import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type PasswordFormParams, SetPasswordForm } from "../components/forms/SetPasswordForm.tsx";
import { authService } from "../services/authService.ts";

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
        return (
            <main className="min-h-[calc(100vh-128px)] flex items-center justify-center">
                <p className="text-red-600">
                    Invalid or missing token
                </p>
            </main>
        );
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