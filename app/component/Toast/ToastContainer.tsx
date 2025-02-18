import { FC } from "react";
import { ToastProps } from "./ToastContext";
import styles from "./ToastContainer.module.css";

const Toast: FC<ToastProps & { onClose: (id: number) => void; }> = (props) => {
    return (
        <div className={`toast toast-${props.type}`} onClick={() => props.onClose(props.id)}>
            {props.message}
        </div>
    )
}

type ToastContainerProps = {
    toasts: ToastProps[];
    removeToast: (id: number) => void;
}

const ToastContainer: FC<ToastContainerProps> = (props) => {
    return (
        <div className={styles['toast-container']}>
            {
                props.toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} onClose={props.removeToast} />
                ))
            }
        </div>
    )
}

export default ToastContainer;