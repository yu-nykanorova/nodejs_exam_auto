import { Outlet } from "react-router-dom";
import { AdminMenu } from "../components/admin-dashboard/AdminMenu.tsx";

export const AdminLayout = () => {
    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-6 text-2xl font-semibold">
                    Admin dashboard
                </h1>

                <AdminMenu/>

                <Outlet />
            </div>
        </div>
    );
};
