import type { IUser } from "../../interfaces/IUser.ts";
import type { FC } from "react";
import { UsersListItem } from "./user-item/UsersListItem.tsx";

type UsersListProps = {
    users: IUser[];
};

export const UsersList: FC<UsersListProps> = ({ users }) => {
    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[700px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Header */}
                <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_auto] gap-4 border-b bg-gray-50 pl-6 pr-10 py-3 text-sm font-semibold text-gray-600">
                    <span>User</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Account</span>
                    <span>Status</span>
                    <span></span>
                </div>

                {/* Users */}
                <ul>
                    {users.map((user) => (
                        <UsersListItem
                            key={user._id}
                            user={user}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};