import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginValidator } from "../validators/login.validator.ts";
import { authSliceActions } from "../store/slices/authSlice.ts";
import { Form } from "../components/ui/Form.tsx";
import { FormInputLabel } from "../components/ui/FormInputLabel.tsx";
import { FormInput } from "../components/ui/FormInput.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { FormButton } from "../components/ui/FormButton.tsx";

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
                    <FormInputLabel htmlFor="email">
                        Email
                    </FormInputLabel>

                    <FormInput
                        id="email"
                        type="email"
                        placeholder="Email"
                        error={!!errors.email}
                        {...register("email")}
                        onBlur={() => clearErrors("email")}
                    />
                    {errors.email?.message && (
                        <ErrorComponent message={errors.email.message}/>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="password">
                        Password
                    </FormInputLabel>

                    <FormInput
                        id="password"
                        type="password"
                        placeholder="Password"
                        error={!!errors.password}
                        {...register("password")}
                        onBlur={() => clearErrors("password")}
                    />
                    {errors.password?.message && (
                        <ErrorComponent message={errors.password.message}/>
                    )}
                </div>

                {error && (
                    <ErrorComponent message={error}/>
                )}

                <FormButton
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </FormButton>

                <div className="flex justify-between text-sm">
                    <FormButton
                        className="text-blue-600 hover:underline"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot password?
                    </FormButton>

                    <FormButton
                        className="text-blue-600 hover:underline"
                        onClick={() => navigate("/sign-up")}
                    >
                        Sign up
                    </FormButton>
                </div>
            </Form>
        </div>
    );
};
