import { AuthInfo } from "./AuthInfo.tsx";
import { Logo } from "./Logo.tsx";
import { MainMenu } from "./MainMenu.tsx";

export const Header = () => {
    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Logo />

                <MainMenu />

                <AuthInfo />
            </div>
        </header>
    );
};
