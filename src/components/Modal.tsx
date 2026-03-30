// basically stolen from the React docs
import { useEffect, useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: PropsWithChildren) => {
  const elRef = useRef<HTMLDivElement>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    const element = elRef.current;

    if (modalRoot && element) {
      modalRoot.appendChild(element);
    }
    
    return () => {
      if (modalRoot && element) {
        modalRoot.removeChild(element);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
