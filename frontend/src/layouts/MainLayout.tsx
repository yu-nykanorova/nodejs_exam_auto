import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer.tsx";
import { Header } from "../components/header/Header.tsx";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};