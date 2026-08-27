import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout.tsx";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            // Public
            { index: true, element: <AdvertsPage /> },
            { path: 'advert/:id', element: <AdvertDetailsPage /> },

            { path: 'login', element: <LoginPage /> },
            { path: 'sign-up', element: <SignUpPage /> },
            { path: 'sign-up/buyer', element: <SignUpFormPage /> },
            { path: 'sign-up/seller', element: <SignUpFormPage /> },

            { path: 'forgot-password', element: <ForgotPasswordPage /> },
            { path: 'reset-password', element: <ResetPasswordPage /> },

            // Protected
            { path: 'profile', element: <ProfilePage /> },
            { path: 'my-adverts', element: <MyAdvertsPage /> },
            { path: 'adverts/create', element: <CreateAdvertPage /> },
            { path: 'adverts/:id/edit', element: <EditAdvertPage /> },

            // Manager / Admin
            { path: 'manager/users', element: <UsersPage /> },
            { path: 'manager/brand-requests', element: <BrandRequestsPage /> },
            { path: 'manager/model-requests', element: <ModelRequestsPage /> },
        ],
    },
]);