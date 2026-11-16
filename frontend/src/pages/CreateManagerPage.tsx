import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import type { IUserCreate } from "../interfaces/IUser.ts";
import { joiResolver } from "@hookform/resolvers/joi";
import { createManagerValidator } from "../validators/createManager.validator.ts";
import { Loader } from "../components/ui/Loader.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { usersService } from "../services/usersService.ts";
import { Form } from "../components/ui/Form.tsx";
import { FormInputLabel } from "../components/ui/FormInputLabel.tsx";
import { FormInput } from "../components/ui/FormInput.tsx";
import { FormButton } from "../components/ui/FormButton.tsx";

export const CreateManagerPage = () => {
    const navigate = useNavigate();

    const { userLoading, error } = useAppSelector(
        ({ userSlice }) => userSlice,
    );

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<IUserCreate>({
        mode: "onSubmit",
        resolver: joiResolver(createManagerValidator),
    });

    const handleCreateManager = async (
        data: IUserCreate,
    ) => {
        await usersService.createManager(data);

        navigate("/manager/users");
    };

    if (userLoading) {
        return <Loader />;
    }

    return (
        <div className="flex-1 mx-auto w-full max-w-lg px-4 py-8">
            <Form
                onSubmit={handleSubmit(
                    handleCreateManager,
                )}
                className="gap-4 rounded-lg border border-gray-200 p-6 shadow-sm"
            >
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Create Manager
                </h1>

                {error && (
                    <div className="mb-4">
                        <ErrorComponent message={error} />
                    </div>
                )}

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
                        step={1}
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

                <FormButton
                    type="submit"
                    className="mt-2 bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                    disabled={userLoading}
                >
                    Create Manager
                </FormButton>
            </Form>
        </div>
    );
};
