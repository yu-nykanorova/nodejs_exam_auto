import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 flex flex-col gap-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center">
                    Create account
                </h1>

                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/sign-up/buyer")}
                        className="h-12 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Sign up as Buyer
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/sign-up/seller")}
                        className="h-12 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer"
                    >
                        Sign up as Seller
                    </button>
                </div>
            </div>
        </main>
    );
};
