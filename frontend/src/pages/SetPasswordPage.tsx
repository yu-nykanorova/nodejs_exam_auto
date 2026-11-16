import { useNavigate, useSearchParams } from "react-router-dom";
import { SetPasswordForm } from "../components/forms/SetPasswordForm.tsx";
import { authService } from "../services/authService.ts";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";

export const SetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleSetPassword = async (password: string) => {
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
            <ErrorComponent
                message="Invalid or missing action token"
                className="p-10"
            />
        );
    }

    return (
        <SetPasswordForm
            title="Create password"
            buttonText="Set password"
            onSubmit={handleSetPassword}
        />
    );
};