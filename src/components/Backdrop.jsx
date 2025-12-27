import { createPortal } from "react-dom";

const Backdrop = ({ onClose }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />,
    document.getElementById("overlay-root")
  );
};

export default Backdrop;
