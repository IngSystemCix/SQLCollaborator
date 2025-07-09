import { ModalProps } from "./Modal.types";

export const Modal = ({isOpen, onClose, icon, title, description, children, size, footer}: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className={`modal`}>
          <div className="modal-content" style={{ maxWidth: size === 'sm' ? '400px' : size === 'md' ? '600px' : size === 'lg' ? '800px' : '1000px' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {icon && <div className="modal-icon mr-2 text-gray-600 dark:text-gray-400">{icon}</div>}
                {title && <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>}
              </div>
              <button className="close-button" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {description && <p className="text-gray-600 mb-4 dark:text-gray-400">{description}</p>}
            <hr className="border-gray-300 mb-4 dark:border-gray-700" />
            <div className="modal-body">
              {children}
            </div>
            {footer && (
              <>
                <hr className="border-gray-300 my-4 dark:border-gray-700" />
                <div className="modal-footer mt-4">
                  {footer}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
