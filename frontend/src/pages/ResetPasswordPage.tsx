import { authService } from "../services/authService.ts";
import { SetPasswordForm } from "../components/forms/SetPasswordForm.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage.tsx";

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleResetPassword = async (password: string) => {
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
        return <NotFoundPage/>
    }

    return (
        <SetPasswordForm
            title="Reset password"
            buttonText="Reset password"
            onSubmit={handleResetPassword}
        />
    );
};