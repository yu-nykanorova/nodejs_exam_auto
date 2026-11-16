import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { forgotPasswordValidator } from "../validators/forgotPassword.validator.ts"
import { authService } from "../services/authService.ts";
import { Form } from "../components/ui/Form.tsx";
import { FormInputLabel } from "../components/ui/FormInputLabel.tsx";
import { FormInput } from "../components/ui/FormInput.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { FormButton } from "../components/ui/FormButton.tsx";
import { getError } from "../utils/getError.ts";

type ForgotPasswordFormParams = {
    email: string;
};

export const ForgotPasswordPage = () => {
    const {
        handleSubmit,
        register,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormParams>({
        mode: "onSubmit",
        resolver: joiResolver(forgotPasswordValidator),
    });

    const handleSendEmail = async (
        data: ForgotPasswordFormParams,
    ) => {
        try {
            await authService.sendForgotPasswordEmail(data);
        } catch (error) {
            setError("root.serverError", {
                type: "server",
                message: getError(error),
            });
        }

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
                    <div className="flex flex-col gap-1 relative">
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

                    {errors.root?.serverError?.message && (
                        <ErrorComponent message={errors.root.serverError.message}/>
                    )}

                    <FormButton
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-600 text-white font-medium transition hover:bg-blue-700"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send reset link"}
                    </FormButton>
                </Form>
            </div>
        </div>
    );
};