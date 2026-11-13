import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { passwordFormValidator } from "../../validators/passwordForm.validator.ts";
import { Form } from "../ui/Form.tsx";
import { FormInputLabel } from "../ui/FormInputLabel.tsx";
import { FormInput } from "../ui/FormInput.tsx";
import { ErrorComponent } from "../ui/ErrorComponent.tsx";
import { FormButton } from "../ui/FormButton.tsx";

export type PasswordFormParams = {
    password: string;
    confirmPassword: string;
};

type PasswordFormProps = {
    title: string;
    buttonText: string;
    loading: boolean;
    error: string | null;
    onSubmit: (data: PasswordFormParams) => void;
};

export const SetPasswordForm = ({
     title,
     buttonText,
     loading,
     error,
     onSubmit,
 }: PasswordFormProps) => {
    const {
        handleSubmit,
        register,
        clearErrors,
        formState: { errors },
    } = useForm<PasswordFormParams>({
        mode: "onSubmit",
        resolver: joiResolver(passwordFormValidator),
    });

    return (
        <div className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md p-6 gap-5 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-semibold text-center">
                    {title}
                </h1>

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

                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="confirmPassword">
                        Confirm password
                    </FormInputLabel>

                    <FormInput
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        error={!!errors.confirmPassword}
                        {...register("confirmPassword")}
                        onBlur={() => clearErrors("confirmPassword")}
                    />
                    {errors.confirmPassword?.message && (
                        <ErrorComponent message={errors.confirmPassword.message}/>
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
                    {loading ? "Saving..." : buttonText}
                </FormButton>
            </Form>
        </div>
    );
};