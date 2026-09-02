import { NavLink } from "react-router-dom";

export const AdminMenu = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `block rounded p-2 text-sm ${
            isActive
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <nav className="mb-8">
            <ul className="flex flex-col gap-1">
                <li>
                    <NavLink
                        to="/manager/users"
                        className={linkClass}
                    >
                        Users
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/manager/brand-requests"
                        className={linkClass}
                    >
                        Brand requests
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/manager/model-requests"
                        className={linkClass}
                    >
                        Model requests
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/manager/catalog"
                        className={linkClass}
                    >
                        Catalog
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/manager/create-manager"
                        className={linkClass}
                    >
                        Create manager
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
