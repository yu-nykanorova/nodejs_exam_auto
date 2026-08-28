import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout.tsx";
import { HomePage } from "../pages/HomePage.tsx";
import { AdvertDetailsPage } from "../pages/AdvertDetailsPage.tsx";
import { LoginPage } from "../pages/LoginPage.tsx";
import { SignUpPage } from "../pages/SignUpPage.tsx";
import { SignUpFormPage } from "../pages/SignUpFormPage.tsx";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage.tsx";
import { ResetPasswordPage } from "../pages/ResetPasswordPage.tsx";
import { SetPasswordPage } from "../pages/SetPasswordPage.tsx";
import { ProfilePage } from "../pages/ProfilePage.tsx";
import { MyAdvertsPage } from "../pages/MyAdvertsPage.tsx";
import { CreateAdvertPage } from "../pages/CreateAdvertPage.tsx";
import { EditAdvertPage } from "../pages/EditAdvertPage.tsx";
import { RequestsPage } from "../pages/RequestsPage.tsx";
import { ManagerLayout } from "../layouts/ManagerLayout.tsx";
import { UsersPage } from "../pages/UsersPage.tsx";
import { UserDetailsPage } from "../pages/UserDetailsPage.tsx";
import { BrandRequestsPage } from "../pages/BrandRequestsPage.tsx";
import { ModelRequestsPage } from "../pages/ModelRequestsPage.tsx";
import { CatalogPage } from "../pages/CatalogPage.tsx";
import { CreateManagerPage } from "../pages/CreateManagerPage.tsx";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            // Public
            { index: true, element: <HomePage /> },
            { path: 'advert/:id', element: <AdvertDetailsPage /> },

            { path: 'login', element: <LoginPage /> },
            { path: 'sign-up', element: <SignUpPage /> },
            { path: 'sign-up/buyer', element: <SignUpFormPage /> },
            { path: 'sign-up/seller', element: <SignUpFormPage /> },

            { path: 'forgot-password', element: <ForgotPasswordPage /> },
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'set-password', element: <SetPasswordPage /> },

            // After login all users
            { path: 'profile', element: <ProfilePage /> },

            // After login seller
            { path: 'my-adverts', element: <MyAdvertsPage /> },
            { path: 'adverts/create', element: <CreateAdvertPage /> },
            { path: 'adverts/:id/edit', element: <EditAdvertPage /> },
            { path: 'requests', element: <RequestsPage /> },

            // Manager / Admin
            {
                path: 'manager',
                element: <ManagerLayout />,
                children: [
                    {
                        path: 'create-manager',
                        element: <CreateManagerPage />,
                    },
                    {
                        path: 'users',
                        element: <UsersPage />,
                    },
                    {
                        path: 'users/:id',
                        element: <UserDetailsPage />,
                    },
                    {
                        path: 'brand-requests',
                        element: <BrandRequestsPage />,
                    },
                    {
                        path: 'model-requests',
                        element: <ModelRequestsPage />,
                    },
                    {
                        path: 'catalog',
                        element: <CatalogPage />,
                    },
                ],
            },
        ],
    },
]);