import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  description,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120]"
      />

      <motion.div
        key="neworder-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-0 z-[121] flex items-end sm:items-center justify-center p-0 sm:p-4"
      >

        <div className="w-full sm:max-w-md bg-white dark:bg-dark-card rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-gray-100 dark:border-white/5">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="text-xs text|-gray-500 dark:text-gray-400 mt-0.5">
                {description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-5 py-4">
            {children}
          </div>

          {footer && <div className="px-5 py-4 border-t border-gray-100 dark:border-white/5">{footer}</div>}
        </div>

      </motion.div>

    </AnimatePresence>
  );
};

export default Modal
