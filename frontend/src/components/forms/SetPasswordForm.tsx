import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { passwordFormValidator } from "../../validators/passwordForm.validator.ts";

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
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md p-6 flex flex-col gap-5 bg-white rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-semibold text-center">
                    {title}
                </h1>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium"
                    >
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

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium"
                    >
                        Repeat password
                    </label>

                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                        onBlur={() => clearErrors("confirmPassword")}
                        className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                    />

                    {errors.confirmPassword && (
                        <p className="text-sm text-red-600">
                            {errors.confirmPassword.message}
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
                    {loading ? "Saving..." : buttonText}
                </button>
            </form>
        </div>
    );
};