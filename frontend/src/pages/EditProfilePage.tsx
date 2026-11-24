import { useAppDispatch } from "../store/hooks/useAppDispatch.tsx";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useAppSelector.tsx";
import type { IUserUpdate } from "../interfaces/IUser.ts";
import { userSliceActions } from "../store/slices/userSlice.ts";
import { EditProfileForm } from "../components/forms/EditUserForm.tsx";
import { ErrorComponent } from "../components/ui/ErrorComponent.tsx";
import { roles } from "../constants/roles.ts";

export const EditProfilePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user } = useAppSelector(({ authSlice }) => authSlice);

    const { error: updateProfileError, userLoading: updateProfileLoading } = useAppSelector(({ userSlice }) => userSlice);

    const handleUpdateProfile = async  (data: IUserUpdate) => {
        try {
            await dispatch(userSliceActions.updateMe(data)).unwrap();
            navigate(`/profile`);
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) {
        return <ErrorComponent message="User not found" />;
    }

    return (
        <div className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
            <EditProfileForm
                user={user}
                isSeller={user.role === roles.SELLER}
                onSubmit={handleUpdateProfile}
                updateProfileError={updateProfileError}
                updateProfileLoading={updateProfileLoading}
            />
        </div>
    );
};
