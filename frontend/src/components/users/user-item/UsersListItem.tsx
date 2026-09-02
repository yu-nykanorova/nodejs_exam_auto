import { Link } from "react-router-dom";
import type { IUser } from "../../../interfaces/IUser.ts";
import type { FC } from "react";

type UserListItemProps = {
    user: IUser;
};

export const UsersListItem: FC<UserListItemProps> = ({ user }) => {
    return (
        <li className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] items-center gap-2 border-b border-gray-100 px-4 py-3 text-sm last:border-b-0 hover:bg-gray-50">
            <div className="flex items-center gap-3">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={`${user.name} ${user.surname}`}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                )}

                <div>
                    <p className="font-semibold text-gray-800">
                        {user.name} {user.surname}
                    </p>

                    <p className="text-xs text-gray-500">
                        {user.phone || "No phone"}
                    </p>
                </div>
            </div>

            <span className="truncate text-gray-600">
                {user.email}
            </span>

            <span className="font-medium text-gray-700">
                {user.role}
            </span>

            <span className="text-gray-600">
                {user.accountType || "—"}
            </span>

            <span className="font-medium text-gray-600">
                {user.status}
            </span>

            <Link
                to={`/manager/users/${user._id}`}
                className="px-2 py-1 whitespace-nowrap font-medium text-white bg-blue-400 rounded-sm hover:text-blue-800 hover:underline"
            >
                Details
            </Link>
        </li>
    );
};