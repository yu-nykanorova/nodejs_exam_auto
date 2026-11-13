import type { FC } from "react";
import { useAppDispatch } from "../../store/hooks/useAppDispatch.tsx";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/useAppSelector.tsx";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { signUpValidator } from "../../validators/signup.validator.ts";
import { authSliceActions } from "../../store/slices/authSlice.ts";
import { Form } from "../ui/Form.tsx";
import { FormInputLabel } from "../ui/FormInputLabel.tsx";
import { FormInput } from "../ui/FormInput.tsx";
import { ErrorComponent } from "../ui/ErrorComponent.tsx";
import { FormButton } from "../ui/FormButton.tsx";

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
            <Form
                onSubmit={handleSubmit(handleSignUp)}
                className="w-full max-w-md p-6 gap-4 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-semibold text-center">
                    Sign up as {isSeller ? "Seller" : "Buyer"}
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <FormInputLabel htmlFor="name">
                            Name
                        </FormInputLabel>

                        <FormInput
                            id="name"
                            placeholder="Name"
                            error={!!errors.name}
                            {...register("name")}
                            onBlur={() => clearErrors("name")}
                        />
                        {errors.name?.message && (
                            <ErrorComponent message={errors.name.message}/>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <FormInputLabel htmlFor="surname">
                            Surname
                        </FormInputLabel>

                        <FormInput
                            id="surname"
                            placeholder="Surname"
                            error={!!errors.surname}
                            {...register("surname")}
                            onBlur={() => clearErrors("surname")}
                        />

                        {errors.surname?.message && (
                            <ErrorComponent message={errors.surname.message}/>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="age">
                        Age
                    </FormInputLabel>

                    <FormInput
                        id="age"
                        type="number"
                        step={1}
                        placeholder="Age"
                        error={!!errors.confirmPassword}
                        {...register("age", {
                            valueAsNumber: true,
                        })}
                        onBlur={() => clearErrors("age")}
                    />
                    {errors.age?.message && (
                        <ErrorComponent message={errors.age.message}/>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <FormInputLabel htmlFor="phone">
                        Phone {isSeller && "*"}
                    </FormInputLabel>

                    <FormInput
                        id="phone"
                        type="tel"
                        placeholder="Phone"
                        error={!!errors.phone}
                        {...register("phone")}
                        onBlur={() => clearErrors("phone")}
                    />
                    {errors.phone?.message && (
                        <ErrorComponent message={errors.phone.message}/>
                    )}
                </div>

                {error && (
                    <ErrorComponent message={error}/>
                )}

                <FormButton
                    type="submit"
                    className="mt-2 bg-blue-600 text-white hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading
                        ? "Creating account..."
                        : "Sign up"}
                </FormButton>

                <FormButton
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => navigate("/login")}
                    disabled={loading}
                >
                    Already have an account? Login
                </FormButton>
            </Form>
        </div>
    );
};