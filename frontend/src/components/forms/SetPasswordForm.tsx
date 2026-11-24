import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { passwordFormValidator } from "../../validators/passwordForm.validator.ts";
import { Form } from "../ui/Form.tsx";
import { FormInputLabel } from "../ui/FormInputLabel.tsx";
import { FormInput } from "../ui/FormInput.tsx";
import { ErrorComponent } from "../ui/ErrorComponent.tsx";
import { Button } from "../ui/Button.tsx";
import { getError } from "../../utils/getError.ts";

type PasswordFormProps = {
    title: string;
    buttonText: string;
    onSubmit: (password: string) => Promise<void>;
};

export const SetPasswordForm = ({
     title,
     buttonText,
     onSubmit,
 }: PasswordFormProps) => {
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<{password: string}>({
        mode: "onSubmit",
        resolver: joiResolver(passwordFormValidator),
    });

    const submitForm = async (data: {password: string}) => {
        try {
            await onSubmit(data.password);
        } catch (error) {
            setError("root.serverError", {
                type: "server",
                message: getError(error),
            })
        }
    }

    return (
        <div className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
            <Form
                onSubmit={handleSubmit(submitForm)}
                className="w-full max-w-md p-6 gap-5 rounded-lg shadow-md"
                noValidate
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
                    />
                    {errors.password?.message && (
                        <ErrorComponent message={errors.password.message}/>
                    )}
                </div>

                {errors.root?.serverError?.message && (
                    <ErrorComponent message={errors.root.serverError.message}/>
                )}

                <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Saving..." : buttonText}
                </Button>
            </Form>
        </div>
    );
};