interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode; // botones o acciones opcionales
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center pb-2 mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer text-2xl leading-none"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        {footer && <div className="pt-2 mt-4">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal
