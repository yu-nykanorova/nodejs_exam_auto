import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.tsx";

export const SignUpPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 flex flex-col gap-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center">
                    Create account
                </h1>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => navigate("/sign-up/buyer")}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Sign up as Buyer
                    </Button>

                    <Button
                        onClick={() => navigate("/sign-up/seller")}
                        className="border border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                        Sign up as Seller
                    </Button>
                </div>
            </div>
        </div>
    );
};
