import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginValidator } from "../validators/login.validator.ts";
import { authSliceActions } from "../store/slices/authSlice.ts";
import { Form } from "../components/ui/Form.tsx";

type LoginFormParams = {
    email: string;
    password: string;
};

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { error, loading } = useAppSelector(
        ({ authSlice }) => authSlice,
    );

    const {
        handleSubmit,
        register,
        clearErrors,
        formState: { errors },
    } = useForm<LoginFormParams>({
        mode: "onSubmit",
        resolver: joiResolver(loginValidator),
    });

    const handleLogin = async (data: LoginFormParams) => {
        const result = await dispatch(
            authSliceActions.login(data),
        );

        if (authSliceActions.login.fulfilled.match(result)) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
            <Form
                onSubmit={handleSubmit(handleLogin)}
                className="w-full max-w-md p-6 gap-5 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-semibold text-center">
                    Login
                </h1>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        onBlur={() => clearErrors("email")}
                        className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                    />

                    {errors.email && (
                        <p className="text-sm text-red-600">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                        onBlur={() => clearErrors("password")}
                        className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                    />

                    {errors.password && (
                        <p className="text-sm text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {error && (
                    <p className="text-sm text-center text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="h-10 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="flex justify-between text-sm">
                    <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Forgot password?
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/sign-up")}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Sign up
                    </button>
                </div>
            </Form>
        </div>
    );
};
