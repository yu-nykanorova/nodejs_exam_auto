import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/useAppSelector.tsx";

export const MainMenu = () => {
    const { user } = useAppSelector(
        ({ authSlice }) => authSlice,
    );

    const activeLink = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "font-semibold text-blue-600"
            : "text-gray-700 hover:text-blue-600";

    return (
        <nav>
            <ul className="flex items-center gap-6 text-sm">
                <li>
                    <NavLink
                        to="/"
                        className={activeLink}
                    >
                        Home
                    </NavLink>
                </li>

                {user && (
                    <>
                        <li>
                            <NavLink
                                to="/profile"
                                className={activeLink}
                            >
                                Profile
                            </NavLink>
                        </li>

                        {user.role === "seller" && (
                            <>
                                <li>
                                    <NavLink
                                        to="/my-adverts"
                                        className={activeLink}
                                    >
                                        My adverts
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/adverts/create"
                                        className={activeLink}
                                    >
                                        Create advert
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {(user.role === "admin" ||
                            user.role === "manager") && (
                            <li>
                                <NavLink
                                    to="/manager"
                                    className={activeLink}
                                >
                                    Management
                                </NavLink>
                            </li>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
};
