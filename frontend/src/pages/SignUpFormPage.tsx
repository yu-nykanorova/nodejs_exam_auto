import { SignUpForm } from "../components/forms/SignupForm.tsx";
import { useLocation } from "react-router-dom";

export const SignUpFormPage = () => {
    const { pathname } = useLocation();

    const isSeller = pathname.endsWith("/seller");

    return <SignUpForm isSeller={isSeller} />;
};