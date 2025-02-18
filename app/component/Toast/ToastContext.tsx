import { createContext, FC, ReactNode, useContext, useState } from "react";
import ToastContainer from "./ToastContainer";

export type ToastSeverity = "success" | "error" | "info";
export type ToastProps = {
    id: number;
    message: string;
    type: ToastSeverity;
}

type ToastContextType = {
    toasts: ToastProps[];
    showToast: (message: string, type?: ToastSeverity) => void;
    removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const showToast = (message: string, type: ToastSeverity = "info") => {
        const id = Date.now(); // TODO: use better id mechanic
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000); // give an option to set delay
    }

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return context;
}