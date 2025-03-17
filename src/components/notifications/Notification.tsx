import { Toast } from "radix-ui";
import * as React from "react";
import "./styles.css";

interface NotificationProps {
  title: string;
  message: string;
  data: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Notification = ({ title, message, data, open, setOpen }: NotificationProps) => {
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">{title}</Toast.Title>
        <Toast.Description asChild>
          <p>{message}</p>
        </Toast.Description>
        <Toast.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <button className="Button small green">Undo</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default Notification;
