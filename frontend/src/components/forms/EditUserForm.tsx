import { Form } from "../ui/Form.tsx";
import { FormInputLabel } from "../ui/FormInputLabel.tsx";
import { FormInput } from "../ui/FormInput.tsx";
import { ErrorComponent } from "../ui/ErrorComponent.tsx";
import { Button } from "../ui/Button.tsx";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser, IUserUpdate } from "../../interfaces/IUser.ts";
import { userUpdateValidator } from "../../validators/user.validator.ts";

type EditProfileFormProps = {
    user: IUser;
    onSubmit: (data: IUserUpdate) => void;
}

export const EditProfileForm: FC<EditProfileFormProps> = ({ user, onSubmit }) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors, dirtyFields },
    } = useForm<IUserUpdate>({
        mode: "onSubmit",
        resolver: joiResolver(userUpdateValidator),
    });

    useEffect(() => {
        reset({
            name: user.name,
            surname: user.surname,
            age: user.age,
            email: user.email,
            phone: user.phone,
        });
    }, [user, reset]);

    const onSubmitEditUser = (data: IUserUpdate) => {
        console.log(dirtyFields);

        const changedData = Object.fromEntries(
            Object.keys(dirtyFields)
                .filter((key) => dirtyFields[key as keyof IUserUpdate])
                .map((key) => [key, data[key as keyof IUserUpdate]]),
        ) as IUserUpdate;

        if (Object.keys(changedData).length === 0) {
            return;
        }

        console.log(changedData);

        onSubmit(changedData);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmitEditUser)}
            className="w-full max-w-2xl p-6 gap-4 rounded-lg shadow-md"
        >
            <h1 className="text-2xl font-semibold text-center">
                Edit profile
            </h1>

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

            <div className="flex flex-col gap-1">
                <FormInputLabel htmlFor="age">
                    Age
                </FormInputLabel>

                <FormInput
                    id="age"
                    type="number"
                    placeholder="Age"
                    error={!!errors.age}
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
                <FormInputLabel htmlFor="phone">
                    Phone
                </FormInputLabel>

                <FormInput
                    id="phone"
                    placeholder="Phone"
                    error={!!errors.phone}
                    {...register("phone")}
                    onBlur={() => clearErrors("phone")}
                />
                {errors.phone?.message && (
                    <ErrorComponent message={errors.phone.message}/>
                )}
            </div>

            {/*{updateAdvertError && (*/}
            {/*    <ErrorComponent message={updateAdvertError}/>*/}
            {/*)}*/}

            <Button
                onClick={() => navigate(`/profile`)}
                className="text-sm text-blue-600 hover:underline cursor-pointer"
            >
                Close
            </Button>

            <Button
                type="submit"
                // disabled={updateAdvertLoading}
                className="mt-2 bg-blue-600 text-white hover:bg-blue-700"
            >
                {/*{updateAdvertLoading*/}
                {/*    ? "Editing advert..."*/}
                {/*    : "Edit advert"}*/}
                Edit profile
            </Button>
        </Form>
    );
};
