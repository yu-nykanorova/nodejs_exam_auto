export const Footer = () => {
    return (
        <footer className="border-t bg-blue-50">
            <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-5">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} AutoDeal. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
