import { toast } from "react-toastify";

const toastConfig = {
  position: "top-center",
  autoClose: 4000,
  hideProgressBar: true,
};

const errorStyle = {
  background: "#FEF3F2",
  color: "#10182B",
  fontSize: "15px",
};
const successStyle = {
  background: "#ECFDF3",
  color: "#10182B",
  fontSize: "15px",
};

const warningStyle = {
  background: "#FFFAEB",
  color: "#10182B",
  fontSize: "15px",
};

const ErrorToast = (message) => {
  toast.error(message, {
    ...toastConfig,
    style: errorStyle,
  });
};

const MultipleErrorToast = (messages) => {
  toast.error(
    <>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </>,
    {
      ...toastConfig,
      style: errorStyle,
    }
  );
};

const SuccessToast = (message) => {
  toast.success(message, {
    ...toastConfig,
    style: successStyle,
  });
};

const WarningToast = (message) => {
  toast.warning(message, {
    ...toastConfig,
    style: warningStyle,
  });
};

const ToastHelper = {
  ErrorToast,
  MultipleErrorToast,
  SuccessToast,
  WarningToast,
};

export default ToastHelper;
