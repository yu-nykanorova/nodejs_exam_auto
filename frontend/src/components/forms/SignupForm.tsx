import type { FC } from "react";
import { useAppDispatch } from "../../store/hooks/useAppDispatch.tsx";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/useAppSelector.tsx";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { signUpValidator } from "../../validators/signup.validator.ts";
import { authSliceActions } from "../../store/slices/authSlice.ts";

type SignUpFormParams = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    surname: string;
    age: number;
    phone?: string;
};

type SignUpFormProps = {
    isSeller: boolean;
};

export const SignUpForm: FC<SignUpFormProps> = ({ isSeller }) => {
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
    } = useForm<SignUpFormParams>({
        mode: "onSubmit",
        resolver: joiResolver(signUpValidator(isSeller)),
    });

    const handleSignUp = async (data: SignUpFormParams) => {
        const { email, password, name, surname, age, phone } = data;

        const result = isSeller
            ? await dispatch(
                authSliceActions.signUpSeller({email,
                    password,
                    name,
                    surname,
                    age,
                    phone,}),
            )
            : await dispatch(
                authSliceActions.signUpBuyer({ email,
                    password,
                    name,
                    surname,
                    age }),
            );

        if (
            authSliceActions.signUpSeller.fulfilled.match(result) ||
            authSliceActions.signUpBuyer.fulfilled.match(result)
        ) {
            navigate("/");
        }
    };

    return (
        <div className="flex-1 min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit(handleSignUp)}
                className="w-full max-w-md p-6 flex flex-col gap-4 bg-white rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-semibold text-center">
                    Sign up as {isSeller ? "Seller" : "Buyer"}
                </h1>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium"
                    >
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            {...register("name")}
                            onBlur={() => clearErrors("name")}
                            className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                        />

                        {errors.name && (
                            <p className="text-sm text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="surname"
                            className="text-sm font-medium"
                        >
                            Surname
                        </label>

                        <input
                            id="surname"
                            type="text"
                            {...register("surname")}
                            onBlur={() => clearErrors("surname")}
                            className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                        />

                        {errors.surname && (
                            <p className="text-sm text-red-600">
                                {errors.surname.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="age"
                        className="text-sm font-medium"
                    >
                        Age
                    </label>

                    <input
                        id="age"
                        type="number"
                        {...register("age", {
                            valueAsNumber: true,
                        })}
                        onBlur={() => clearErrors("age")}
                        className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                    />

                    {errors.age && (
                        <p className="text-sm text-red-600">
                            {errors.age.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="phone"
                        className="text-sm font-medium"
                    >
                        Phone {isSeller && "*"}
                    </label>

                    <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        onBlur={() => clearErrors("phone")}
                        className="h-10 px-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                    />

                    {errors.phone && (
                        <p className="text-sm text-red-600">
                            {errors.phone.message}
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
                    className="h-10 mt-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading
                        ? "Creating account..."
                        : "Sign up"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                    Already have an account? Login
                </button>
            </form>
        </div>
    );
};