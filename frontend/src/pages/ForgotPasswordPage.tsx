import { useForm } from "react-hook-form";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import { joiResolver } from "@hookform/resolvers/joi";
import { forgotPasswordValidator } from "../validators/forgotPassword.validator.ts"
import { authService } from "../services/authService.ts";
import { Form } from "../components/ui/Form.tsx";

type ForgotPasswordFormParams = {
    email: string;
};


export const ForgotPasswordPage = () => {
    const { loading, error } = useAppSelector(
        ({ authSlice }) => authSlice,
    );

    const {
        handleSubmit,
        register,
        clearErrors,
        formState: { errors },
    } = useForm<ForgotPasswordFormParams>({
        mode: "onSubmit",
        resolver: joiResolver(forgotPasswordValidator),
    });


    const handleSendEmail = async (
        data: ForgotPasswordFormParams,
    ) => {
        await authService.sendForgotPasswordEmail(data);
    };


    return (
        <div className="min-h-[calc(100vh-128px)] flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">

                <h1 className="mb-2 text-center text-2xl font-semibold">
                    Forgot password?
                </h1>

                <p className="mb-6 text-center text-sm text-gray-500">
                    Enter your email and we will send you a link
                    to reset your password.
                </p>

                <Form
                    onSubmit={handleSubmit(handleSendEmail)}
                    className="gap-4"
                >
                    <div className="relative">
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            onBlur={() => clearErrors("email")}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="example@email.com"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {error && (
                        <p className="text-center text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send reset link"}
                    </button>
                </Form>
            </div>
        </div>
    );
};