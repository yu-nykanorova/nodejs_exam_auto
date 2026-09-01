import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import type { IUserCreate } from "../interfaces/IUser.ts";
import { joiResolver } from "@hookform/resolvers/joi";
import { createManagerValidator } from "../validators/createManager.validator.ts";
import { Loader } from "../components/ui/Loader.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { usersService } from "../services/usersService.ts";

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
        <main className="mx-auto w-full max-w-lg px-4 py-8">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Create Manager
                </h1>

                {error && (
                    <div className="mb-4">
                        <ErrorComponent message={error} />
                    </div>
                )}

                <form
                    onSubmit={handleSubmit(
                        handleCreateManager,
                    )}
                    className="flex flex-col gap-4"
                >
                    {/* Email */}
                    <div>
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
                            onBlur={() =>
                                clearErrors("email")
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            {...register("name")}
                            onBlur={() =>
                                clearErrors("name")
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Surname */}
                    <div>
                        <label
                            htmlFor="surname"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Surname
                        </label>

                        <input
                            id="surname"
                            type="text"
                            {...register("surname")}
                            onBlur={() =>
                                clearErrors("surname")
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                        {errors.surname && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.surname.message}
                            </p>
                        )}
                    </div>

                    {/* Age */}
                    <div>
                        <label
                            htmlFor="age"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Age
                        </label>

                        <input
                            id="age"
                            type="number"
                            {...register("age", {
                                valueAsNumber: true,
                            })}
                            onBlur={() =>
                                clearErrors("age")
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                        {errors.age && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.age.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={userLoading}
                        className="mt-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Create Manager
                    </button>
                </form>
            </div>
        </main>
    );
};
