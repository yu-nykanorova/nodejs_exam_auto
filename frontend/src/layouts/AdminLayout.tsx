import { NavLink, Outlet } from "react-router-dom";

export const AdminLayout = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `block rounded px-4 py-2 text-sm ${
            isActive
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-6 text-2xl font-semibold">
                    Admin dashboard
                </h1>

                <nav className="mb-8">
                    <ul className="flex flex-col gap-2">
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

                <Outlet />
            </div>
        </div>
    );
};
