import { type FC, type ReactNode, useEffect } from "react";
import { Button } from "./Button.tsx";

type ModalConfirmProps = {
    message: string;
    comment?: string;
    children?: ReactNode;
    onClose: () => void;
    onConfirm: () => void;
    className?: string;
}

export const ModalConfirm: FC<ModalConfirmProps> = ({ message, comment, children, onClose, onConfirm, className }) => {

    useEffect(() => {
        const initOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = initOverflow;
        }
    }, []);

    return (
        <div
            className={`size-full flex justify-center items-center fixed inset-0 bg-black/60 z-50 ${className}`}
            onClick={onClose}
        >
            <div
                className="w-[50%] max-w-200 max-h-[90%] p-4 flex flex-col gap-1 bg-white rounded-lg overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="mb-4 font-medium">Confirm action</h4>
                <p>{message}</p>
                <p className="mt-2 text-sm text-gray-600">{comment}</p>
                <div className="flex justify-end gap-2">
                    <Button
                        className="px-3 py-1 border border-blue-600 text-blue-600 hover:bg-blue-50"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>

                {children}
            </div>
        </div>
    );
};